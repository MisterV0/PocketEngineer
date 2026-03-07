import os
import re
import urllib.request
import urllib.parse
import json
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

HEADERS = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'}

def download_fonts():
    os.makedirs('resources/fonts', exist_ok=True)
    url = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
    req = urllib.request.Request(url, headers=HEADERS)
    css_content = urllib.request.urlopen(req, context=ctx).read().decode('utf-8')

    fonts = []
    
    # regex to find woff2 URLs in the css block
    def replacer(match):
        font_url = match.group(1)
        font_name = font_url.split('/')[-1]
        
        # Download the woff2 file
        if not os.path.exists(f'resources/fonts/{font_name}'):
            print(f'Downloading font {font_name}...')
            req2 = urllib.request.Request(font_url, headers=HEADERS)
            font_data = urllib.request.urlopen(req2, context=ctx).read()
            with open(f'resources/fonts/{font_name}', 'wb') as f:
                f.write(font_data)
                
        return f"url('fonts/{font_name}')"

    new_css = re.sub(r"url\((https://[^)]+\.woff2)\)", replacer, css_content)
    with open('resources/fonts.css', 'w') as f:
        f.write(new_css)

def create_tailwind_config():
    config = """/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./resources/**/*.js", "./*.js"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
      },
      animation: {
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-up-delay': 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    }
  }
}
"""
    with open('tailwind.config.js', 'w') as f:
        f.write(config)

    input_css = """@tailwind base;
@tailwind components;
@tailwind utilities;
"""
    with open('input.css', 'w') as f:
        f.write(input_css)

def build_tailwind():
    # Download binary
    if not os.path.exists('tailwindcss'):
        print('Downloading Tailwind CLI...')
        os.system('curl -sLO https://github.com/tailwindlabs/tailwindcss/releases/download/v3.4.17/tailwindcss-macos-arm64')
        os.system('mv tailwindcss-macos-arm64 tailwindcss')
        os.system('chmod +x tailwindcss')
    
    print('Building Tailwind CSS...')
    os.system('./tailwindcss -i ./input.css -o ./resources/tailwind.css --minify')

def update_html_files():
    html_files = [f for f in os.listdir('.') if f.endswith('.html')]
    
    for filename in html_files:
        with open(filename, 'r') as f:
            content = f.read()
            
        original_content = content
        
        # Remove Google Fonts Preconnect
        content = re.sub(r'<link rel="preconnect" href="https://fonts\.googleapis\.com">\s*', '', content)
        content = re.sub(r'<link rel="preconnect" href="https://fonts\.gstatic\.com" crossorigin>\s*', '', content)
        
        # Replace Google Fonts link with local link
        content = re.sub(r'<link.*?href="https://fonts\.googleapis\.com/css2.*?family=.*?rel="stylesheet">', '<link rel="stylesheet" href="resources/fonts.css">', content)
        
        # Replace Tailwind CDN script with local CSS link
        content = re.sub(r'<script src="https://cdn\.tailwindcss\.com"></script>', '<link rel="stylesheet" href="resources/tailwind.css">', content)
        
        # Remove the <script> block containing tailwind.config
        # We need a robust regex to get <script>\n  tailwind.config = ... \n</script>
        content = re.sub(r'<script>\s*tailwind\.config\s*=\s*\{.*?</script>\s*', '', content, flags=re.DOTALL)
        
        if original_content != content:
            with open(filename, 'w') as f:
                f.write(content)
            print(f'Updated {filename}')

if __name__ == '__main__':
    download_fonts()
    create_tailwind_config()
    build_tailwind()
    update_html_files()
    print('Done!')
