/**
 * PocketEngineer — social / thumbnail card definitions.
 *
 *   slug    : matches the tool page basename (and the preview hash in social-cards.html)
 *   file    : the tool page the card belongs to ('' for the landing page)
 *   img     : output PNG name — kept descriptive, because the filename is a Google Images signal
 *   alt     : alt text, reused for og:image:alt and the image sitemap caption
 *   accent  : the accent colour that tool uses on the landing page; in the drawing it marks
 *             ONE thing only — the computed answer
 *   spec    : the worked example in the footer strip. Every number here must check out;
 *             they are verified in src/social-cards-check.py
 *   art     : the drawing, in a 460x300 viewBox
 *
 * Drawing classes live in social-cards.html: ink / ink-r / hair / dash / fillpale /
 * acc / accfill / lbl / lbl-s / lbl-a / num / num-a.
 */
const TOOLS = [
  {
    slug: 'voltage', file: 'tools/voltage.html', img: 'voltage-divider-calculator.png',
    cat: 'Electronics', name: 'Voltage Divider',
    tagline: 'Solve R1, R2 and Vout in real time, with the divider drawn as you type.',
    accent: '#2563eb',
    alt: 'Voltage divider schematic: 12 V across two 10 kilohm resistors giving 6 V out',
    spec: 'Vin 12 V <span class="sep">&middot;</span> R1 10 k&#8486; <span class="sep">&middot;</span> R2 10 k&#8486; <span class="sep">&middot;</span> <b>Vout 6.00 V</b>',
    art: `
      <circle cx="150" cy="34" r="3.5" fill="#18181b"/>
      <text x="168" y="39" class="lbl">Vin 12 V</text>
      <path class="ink" d="M150 34 V 70"/>
      <rect x="130" y="70" width="40" height="56" class="fillpale" stroke="#18181b" stroke-width="1.8"/>
      <text x="184" y="94" class="lbl">R1</text>
      <text x="184" y="113" class="lbl-s">10 k&#8486;</text>
      <path class="ink" d="M150 126 V 172"/>
      <rect x="130" y="172" width="40" height="56" class="fillpale" stroke="#18181b" stroke-width="1.8"/>
      <text x="184" y="196" class="lbl">R2</text>
      <text x="184" y="215" class="lbl-s">10 k&#8486;</text>
      <path class="acc" d="M150 150 H 340"/>
      <circle cx="150" cy="150" r="4" class="accfill"/>
      <circle cx="340" cy="150" r="3.5" class="accfill"/>
      <text x="340" y="134" class="lbl-a" text-anchor="middle">Vout 6 V</text>
      <path class="ink" d="M150 228 V 252"/>
      <path class="ink" d="M128 252 H 172 M135 261 H 165 M142 270 H 158"/>`
  },
  {
    slug: 'resistor', file: 'tools/resistor.html', img: 'resistor-color-code-calculator.png',
    cat: 'Electronics', name: 'Resistor Codes',
    tagline: 'Decode 4 and 5-band resistors, or work back from a value to the colors.',
    accent: '#d97706',
    alt: 'Four-band resistor decoded: yellow violet red gold equals 4.7 kilohm at 5 percent',
    spec: 'Yellow Violet Red Gold <span class="sep">&middot;</span> 47 &times; 100 <span class="sep">&middot;</span> <b>4.7 k&#8486; &plusmn;5%</b>',
    art: `
      <path class="ink" d="M14 128 H 446"/>
      <rect x="120" y="96" width="220" height="64" rx="12" class="fillpale" stroke="#18181b" stroke-width="1.8"/>
      <rect x="150" y="97" width="15" height="62" fill="#eab308"/>
      <rect x="182" y="97" width="15" height="62" fill="#7c3aed"/>
      <rect x="214" y="97" width="15" height="62" fill="#dc2626"/>
      <rect x="302" y="97" width="15" height="62" fill="#ca8a04"/>
      <path class="hair" d="M157.5 168 V 182 M189.5 168 V 182 M221.5 168 V 182 M309.5 168 V 182"/>
      <text x="157.5" y="198" class="lbl-s" text-anchor="middle">4</text>
      <text x="189.5" y="198" class="lbl-s" text-anchor="middle">7</text>
      <text x="221.5" y="198" class="lbl-s" text-anchor="middle">x100</text>
      <text x="309.5" y="198" class="lbl-s" text-anchor="middle">5%</text>
      <text x="230" y="252" class="num-a" text-anchor="middle">4.7 k&#8486;</text>`
  },
  {
    slug: 'ohms-law', file: 'tools/ohms-law.html', img: 'ohms-law-calculator.png',
    cat: 'Electronics', name: "Ohm's Law Calculator",
    tagline: 'Enter any two of V, I, R or P and the other two are solved instantly.',
    accent: '#16a34a',
    alt: "Ohm's law triangle with voltage over current and resistance",
    spec: 'I 0.5 A <span class="sep">&middot;</span> R 24 &#8486; <span class="sep">&middot;</span> P 6 W <span class="sep">&middot;</span> <b>V 12 V</b>',
    art: `
      <path class="ink ink-r" d="M230 42 L 400 252 L 60 252 Z"/>
      <path class="ink" d="M133 162 H 327"/>
      <path class="ink" d="M230 162 V 252"/>
      <text x="230" y="140" text-anchor="middle" font-family="Inter, sans-serif" font-size="46" font-weight="600" style="fill:var(--accent)">V</text>
      <text x="181" y="226" text-anchor="middle" font-family="Inter, sans-serif" font-size="38" font-weight="600" fill="#18181b">I</text>
      <text x="279" y="226" text-anchor="middle" font-family="Inter, sans-serif" font-size="38" font-weight="600" fill="#18181b">R</text>
      <text x="230" y="284" class="lbl-s" text-anchor="middle">V = I &times; R</text>`
  },
  {
    slug: 'grid', file: 'tools/grid.html', img: 'series-parallel-circuit-simulator.png',
    cat: 'Electronics', name: 'Circuit Canvas',
    tagline: 'Build series and parallel networks on a canvas and read the totals instantly.',
    accent: '#65a30d',
    alt: 'Series and parallel resistor network totalling 2.40 kilohm',
    spec: 'R1 1.0 k&#8486; + (R2 2.0 k&#8486; || R3 4.7 k&#8486;) <span class="sep">&middot;</span> <b>2.40 k&#8486;</b>',
    art: `
      <path class="ink" d="M60 108 V 70 H 170 M226 70 H 396"/>
      <path class="ink" d="M60 144 V 230 H 396"/>
      <path class="ink" d="M396 70 V 122 M396 178 V 230"/>
      <path class="ink" d="M306 70 V 122 M306 178 V 230"/>
      <rect x="170" y="54" width="56" height="32" class="fillpale" stroke="#18181b" stroke-width="1.8"/>
      <rect x="290" y="122" width="32" height="56" class="fillpale" stroke="#18181b" stroke-width="1.8"/>
      <rect x="380" y="122" width="32" height="56" class="fillpale" stroke="#18181b" stroke-width="1.8"/>
      <path class="ink" d="M40 108 H 80 M50 120 H 70 M40 132 H 80 M50 144 H 70"/>
      <text x="32" y="130" class="lbl-s" text-anchor="end">12 V</text>
      <text x="198" y="44" class="lbl-s" text-anchor="middle">R1 1.0k</text>
      <text x="284" y="154" class="lbl-s" text-anchor="end">2.0k</text>
      <text x="374" y="154" class="lbl-s" text-anchor="end">4.7k</text>
      <circle cx="306" cy="70" r="3.5" fill="#18181b"/>
      <circle cx="306" cy="230" r="3.5" fill="#18181b"/>
      <text x="230" y="276" class="lbl-a" text-anchor="middle">R total 2.40 k&#8486;</text>`
  },
  {
    slug: 'led', file: 'tools/led.html', img: 'led-resistor-calculator.png',
    cat: 'Electronics', name: 'LED Calculator',
    tagline: 'Pick an LED color and supply voltage to get the exact series resistor.',
    accent: '#dc2626',
    alt: 'LED series resistor circuit: 5 V supply, 2.0 V forward drop, 20 mA, 150 ohm resistor',
    spec: 'Vs 5 V <span class="sep">&middot;</span> Vf 2.0 V <span class="sep">&middot;</span> If 20 mA <span class="sep">&middot;</span> <b>R 150 &#8486;</b>',
    art: `
      <path class="ink" d="M60 108 V 70 H 170 M226 70 H 400"/>
      <path class="ink" d="M60 144 V 230 H 400"/>
      <path class="ink" d="M400 70 V 128 M400 172 V 230"/>
      <rect x="170" y="54" width="56" height="32" class="fillpale" stroke="#18181b" stroke-width="1.8"/>
      <text x="198" y="44" class="lbl-a" text-anchor="middle">150 &#8486;</text>
      <path class="ink" d="M40 108 H 80 M50 120 H 70 M40 132 H 80 M50 144 H 70"/>
      <text x="32" y="130" class="lbl-s" text-anchor="end">5 V</text>
      <path class="ink ink-r fillpale" d="M382 128 L 418 128 L 400 162 Z"/>
      <path class="ink" d="M380 166 H 420"/>
      <path class="ink ink-r" d="M424 126 L 440 110 M430 140 L 446 124"/>
      <path d="M440 110 l -8.5 1.2 l 4.6 5.3 Z M446 124 l -8.5 1.2 l 4.6 5.3 Z" fill="#18181b"/>
      <text x="368" y="144" class="lbl-s" text-anchor="end">Vf 2.0 V</text>
      <text x="368" y="163" class="lbl-s" text-anchor="end">If 20 mA</text>`
  },
  {
    slug: 'PowerStation', file: 'tools/PowerStation.html', img: 'power-station-battery-runtime-calculator.png',
    cat: 'Electronics', name: 'Power Station Runtime',
    tagline: 'Add the devices you plan to run and see how long the battery actually lasts.',
    accent: '#2563eb',
    alt: 'Battery runtime: 1000 Wh station at 62 percent running a 75 W load for 8 hours 16 minutes',
    spec: '1000 Wh <span class="sep">&middot;</span> 62% charge <span class="sep">&middot;</span> 75 W load <span class="sep">&middot;</span> <b>8 h 16 m</b>',
    art: `
      <rect x="30" y="98" width="212" height="104" class="fillnone" stroke="#18181b" stroke-width="1.8"/>
      <rect x="242" y="132" width="11" height="36" fill="#18181b"/>
      <rect x="38" y="106" width="120" height="88" class="accfill"/>
      <text x="98" y="160" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="26" font-weight="600" fill="#fff">62%</text>
      <path class="hair" d="M30 216 H 242 M30 210 V 222 M242 210 V 222"/>
      <text x="136" y="240" class="lbl-s" text-anchor="middle">620 Wh usable</text>
      <text x="288" y="124" class="lbl-s">RUNTIME</text>
      <text x="288" y="166" class="num-a">8 h 16 m</text>
      <path class="hair" d="M288 186 H 440"/>
      <text x="288" y="212" class="lbl-s">75 W CONTINUOUS</text>`
  },
  {
    slug: 'lcd', file: 'tools/lcd.html', img: 'arduino-lcd-display-designer.png',
    cat: 'Electronics', name: 'LCD Designer',
    tagline: 'Lay out an HD44780 screen character by character and copy the Arduino code.',
    accent: '#0891b2',
    alt: 'HD44780 16 by 2 character LCD module showing Hello World',
    spec: 'HD44780 <span class="sep">&middot;</span> 16&times;2 and 20&times;4 <span class="sep">&middot;</span> 5&times;8 glyphs <span class="sep">&middot;</span> <b>Arduino export</b>',
    art: `
      <g fill="#a1a1aa">
        <rect x="46" y="48" width="9" height="11"/><rect x="66" y="48" width="9" height="11"/>
        <rect x="86" y="48" width="9" height="11"/><rect x="106" y="48" width="9" height="11"/>
        <rect x="126" y="48" width="9" height="11"/><rect x="146" y="48" width="9" height="11"/>
        <rect x="166" y="48" width="9" height="11"/><rect x="186" y="48" width="9" height="11"/>
      </g>
      <rect x="34" y="64" width="392" height="180" rx="3" fill="#27272a"/>
      <rect x="56" y="86" width="348" height="136" fill="#93b84c"/>
      <g stroke="#1f2d10" stroke-opacity="0.13" stroke-width="1">
        <path d="M77.75 86 V 222 M99.5 86 V 222 M121.25 86 V 222 M143 86 V 222 M164.75 86 V 222
                 M186.5 86 V 222 M208.25 86 V 222 M230 86 V 222 M251.75 86 V 222 M273.5 86 V 222
                 M295.25 86 V 222 M317 86 V 222 M338.75 86 V 222 M360.5 86 V 222 M382.25 86 V 222
                 M56 154 H 404"/>
      </g>
      <text x="68" y="132" font-family="'JetBrains Mono', monospace" font-size="26" font-weight="700" fill="#1f2d10" letter-spacing="5.1">HELLO WORLD</text>
      <text x="68" y="200" font-family="'JetBrains Mono', monospace" font-size="26" font-weight="700" fill="#1f2d10" letter-spacing="5.1">16x2 HD44780</text>
      <text x="230" y="272" class="lbl-s" text-anchor="middle">2 ROWS x 16 COLUMNS</text>`
  },
  {
    slug: 'circle', file: 'tools/circle.html', img: 'circle-calculator.png',
    cat: 'Geometry', name: 'Circle Solver',
    tagline: 'Radius, diameter, circumference and area from whichever one you know.',
    accent: '#e11d48',
    alt: 'Circle with radius 40 marked, circumference 251.33 and area 5026.5',
    spec: 'r 40 <span class="sep">&middot;</span> d 80 <span class="sep">&middot;</span> C 251.33 <span class="sep">&middot;</span> <b>A 5026.5</b>',
    art: `
      <circle cx="230" cy="150" r="100" class="fillnone" stroke="#18181b" stroke-width="1.8"/>
      <path class="dash" d="M130 150 H 330"/>
      <path class="hair" d="M222 150 H 238 M230 142 V 158"/>
      <path class="acc" d="M230 150 L 306.6 85.7"/>
      <text x="254" y="101" class="lbl-a" text-anchor="middle">r 40</text>
      <text x="166" y="142" class="lbl-s">d 80</text>
      <text x="230" y="284" class="lbl-s" text-anchor="middle">A = &pi;r&sup2;</text>`
  },
  {
    slug: 'rectangle', file: 'tools/rectangle.html', img: 'rectangle-calculator.png',
    cat: 'Geometry', name: 'Rectangle Solver',
    tagline: 'Area, perimeter and diagonal from the side lengths, drawn to scale.',
    accent: '#7c3aed',
    alt: 'Rectangle 30 by 16 with diagonal 34, area 480 and perimeter 92',
    spec: 'w 30 <span class="sep">&middot;</span> h 16 <span class="sep">&middot;</span> P 92 <span class="sep">&middot;</span> d 34 <span class="sep">&middot;</span> <b>A 480</b>',
    art: `
      <rect x="92" y="66" width="280" height="150" class="fillnone" stroke="#18181b" stroke-width="1.8"/>
      <path class="acc" d="M92 216 L 372 66"/>
      <text x="221" y="120" class="lbl-a" text-anchor="middle">d 34</text>
      <path class="hair" d="M92 244 H 372 M92 238 V 250 M372 238 V 250"/>
      <text x="232" y="270" class="lbl-s" text-anchor="middle">w 30</text>
      <path class="hair" d="M68 66 V 216 M62 66 H 74 M62 216 H 74"/>
      <text x="54" y="146" class="lbl-s" text-anchor="end">h 16</text>`
  },
  {
    slug: 'square', file: 'tools/square.html', img: 'square-calculator.png',
    cat: 'Geometry', name: 'Square Solver',
    tagline: 'Side, diagonal, perimeter and area from a single measurement.',
    accent: '#0891b2',
    alt: 'Square of side 25 with diagonal 35.36, area 625 and perimeter 100',
    spec: 'a 25 <span class="sep">&middot;</span> P 100 <span class="sep">&middot;</span> d 35.36 <span class="sep">&middot;</span> <b>A 625</b>',
    art: `
      <rect x="150" y="58" width="160" height="160" class="fillnone" stroke="#18181b" stroke-width="1.8"/>
      <path class="acc" d="M150 218 L 310 58"/>
      <text x="207" y="115" class="lbl-a" text-anchor="middle">d 35.36</text>
      <path class="hair" d="M150 246 H 310 M150 240 V 252 M310 240 V 252"/>
      <text x="230" y="272" class="lbl-s" text-anchor="middle">a 25</text>
      <path class="hair" d="M126 58 V 218 M120 58 H 132 M120 218 H 132"/>
      <text x="112" y="144" class="lbl-s" text-anchor="end">a 25</text>`
  },
  {
    slug: 'pitagora', file: 'tools/pitagora.html', img: 'pythagorean-theorem-calculator.png',
    cat: 'Geometry', name: 'Pythagorean Theorem',
    tagline: 'Any two sides of a right triangle give you the third, drawn to scale.',
    accent: '#059669',
    alt: 'Right triangle with legs 3 and 4 and hypotenuse 5, drawn to scale',
    spec: 'a 3 <span class="sep">&middot;</span> b 4 <span class="sep">&middot;</span> 9 + 16 = 25 <span class="sep">&middot;</span> <b>c 5</b>',
    art: `
      <path class="ink" d="M100 60 V 240 H 340"/>
      <path class="acc" d="M100 60 L 340 240"/>
      <path class="hair" d="M100 222 H 118 V 240"/>
      <text x="88" y="156" class="lbl-s" text-anchor="end">a 3</text>
      <text x="220" y="264" class="lbl-s" text-anchor="middle">b 4</text>
      <text x="232" y="134" class="lbl-a">c 5</text>
      <text x="230" y="290" class="lbl-s" text-anchor="middle">a&sup2; + b&sup2; = c&sup2;</text>`
  },
  {
    slug: 'binary', file: 'tools/binary.html', img: 'binary-to-decimal-converter.png',
    cat: 'Programming', name: 'Binary Converter',
    tagline: 'Binary to decimal and back, with every place value shown step by step.',
    accent: '#4f46e5',
    alt: 'Binary 10101101 converted to decimal 173 with place values shown',
    spec: '0b1010 1101 <span class="sep">&middot;</span> 128+32+8+4+1 <span class="sep">&middot;</span> <b>173</b>',
    art: `
      <g id="bits"></g>
      <path class="hair" d="M49 156 H 411"/>
      <text x="230" y="212" class="num-a" text-anchor="middle">173</text>
      <text x="230" y="248" class="lbl-s" text-anchor="middle">BASE 2 TO BASE 10</text>`,
    build: function (svg) {
      const bits = [1, 0, 1, 0, 1, 1, 0, 1];
      const place = [128, 64, 32, 16, 8, 4, 2, 1];
      let out = '';
      bits.forEach((b, i) => {
        const x = 49 + i * 46;
        const on = b === 1;
        out += `<rect x="${x}" y="52" width="40" height="44" ${on ? 'fill="#18181b"' : 'class="fillnone" stroke="#d4d4d8" stroke-width="1"'}/>
                <text x="${x + 20}" y="82" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="21" font-weight="600" fill="${on ? '#ffffff' : '#a1a1aa'}">${b}</text>
                <text x="${x + 20}" y="118" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="11" fill="${on ? '#52525b' : '#d4d4d8'}">${place[i]}</text>`;
      });
      return svg.replace('<g id="bits"></g>', out);
    }
  },
  {
    slug: 'hexa', file: 'tools/hexa.html', img: 'hex-to-decimal-converter.png',
    cat: 'Programming', name: 'Hexadecimal Converter',
    tagline: 'Hex, decimal, binary and octal side by side, converted as you type.',
    accent: '#9333ea',
    alt: 'Hexadecimal FF shown as 255 decimal, 11111111 binary and 377 octal',
    spec: '0xFF <span class="sep">&middot;</span> 0b1111 1111 <span class="sep">&middot;</span> 0o377 <span class="sep">&middot;</span> <b>255</b>',
    art: `
      <path class="hair" d="M30 92 H 430 M30 146 H 430 M30 200 H 430"/>
      <text x="30" y="76" class="lbl-s">HEX</text>
      <text x="130" y="80" class="num">FF</text>
      <text x="30" y="130" class="lbl-s">DEC</text>
      <text x="130" y="134" class="num-a">255</text>
      <text x="30" y="184" class="lbl-s">BIN</text>
      <text x="130" y="188" font-family="'JetBrains Mono', monospace" font-size="24" font-weight="600" fill="#18181b">1111 1111</text>
      <text x="30" y="238" class="lbl-s">OCT</text>
      <text x="130" y="242" class="num">377</text>`
  },
  {
    slug: 'bitoperations', file: 'tools/bitoperations.html', img: 'bitwise-operations-calculator.png',
    cat: 'Programming', name: 'Bitwise Calculator',
    tagline: 'AND, OR, XOR, NOT and shifts with every bit laid out visually.',
    accent: '#ea580c',
    alt: 'Bitwise AND of 180 and 109 giving 36, shown bit by bit',
    spec: '180 &amp; 109 <span class="sep">&middot;</span> 1011 0100 &amp; 0110 1101 <span class="sep">&middot;</span> <b>36</b>',
    art: `
      <g id="rows"></g>
      <path class="ink" d="M76 150 H 383"/>
      <text x="62" y="76" class="lbl" text-anchor="end">A</text>
      <text x="62" y="128" class="lbl" text-anchor="end">B</text>
      <rect x="20" y="96" width="44" height="26" class="fillnone" stroke="#d4d4d8" stroke-width="1"/>
      <text x="42" y="114" class="lbl-s" text-anchor="middle">AND</text>
      <text x="400" y="76" class="lbl-s">180</text>
      <text x="400" y="128" class="lbl-s">109</text>
      <text x="400" y="196" class="lbl-a">36</text>`,
    build: function (svg) {
      const rows = [
        { y: 52, bits: [1, 0, 1, 1, 0, 1, 0, 0], accent: false },
        { y: 104, bits: [0, 1, 1, 0, 1, 1, 0, 1], accent: false },
        { y: 168, bits: [0, 0, 1, 0, 0, 1, 0, 0], accent: true }
      ];
      let out = '';
      rows.forEach(row => {
        row.bits.forEach((b, i) => {
          const x = 76 + i * 39;
          const on = b === 1;
          const fill = on ? (row.accent ? 'class="accfill"' : 'fill="#18181b"') : 'class="fillnone" stroke="#d4d4d8" stroke-width="1"';
          out += `<rect x="${x}" y="${row.y}" width="33" height="34" ${fill}/>
                  <text x="${x + 16.5}" y="${row.y + 24}" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="18" font-weight="600" fill="${on ? '#ffffff' : '#a1a1aa'}">${b}</text>`;
        });
      });
      return svg.replace('<g id="rows"></g>', out);
    }
  },
  {
    slug: 'median', file: 'tools/median.html', img: 'median-calculator.png',
    cat: 'Programming', name: 'Median Calculator',
    tagline: 'Median, mean and spread from your dataset, plus the code to reproduce it.',
    accent: '#0d9488',
    alt: 'Seven sorted values with the median 24 marked on the middle bar',
    spec: '5 8 17 24 31 40 56 <span class="sep">&middot;</span> n 7 <span class="sep">&middot;</span> <b>median 24</b>',
    art: `
      <g id="bars"></g>
      <path class="ink" d="M40 244 H 420"/>
      <path class="dash" style="stroke:var(--accent)" d="M40 171 H 420"/>
      <text x="40" y="162" class="lbl-a">median 24</text>`,
    build: function (svg) {
      // bar heights are proportional to the values, so the chart is honest
      const data = [5, 8, 17, 24, 31, 40, 56];
      let out = '';
      data.forEach((v, i) => {
        const x = 62 + i * 50;
        const h = (v / 56) * 170;
        const mid = i === 3;
        out += `<rect x="${x}" y="${(244 - h).toFixed(1)}" width="36" height="${h.toFixed(1)}" ${mid ? 'class="accfill"' : 'class="fillpale" stroke="#d4d4d8" stroke-width="1"'}/>
                <text x="${x + 18}" y="264" text-anchor="middle" class="lbl-s" ${mid ? 'style="fill:#18181b"' : ''}>${v}</text>`;
      });
      return svg.replace('<g id="bars"></g>', out);
    }
  },
  {
    slug: 'matrix', file: 'tools/matrix.html', img: 'matrix-calculator.png',
    cat: 'Math', name: 'Matrix Calculator',
    tagline: 'Add, multiply, invert and transpose matrices to 5&times;5, plus det, trace and rank.',
    accent: '#7c3aed',
    alt: 'Two by two matrix multiplication A times B giving C',
    spec: 'A[1 2; 3 4] &times; B[0 1; 1 0] <span class="sep">&middot;</span> <b>C[2 1; 4 3]</b>',
    art: `
      <g id="matrices"></g>
      <text x="155" y="160" class="num" text-anchor="middle">&times;</text>
      <text x="295" y="160" class="num" text-anchor="middle">=</text>
      <text x="230" y="260" class="lbl-s" text-anchor="middle">DET . INVERSE . TRANSPOSE . RANK</text>`,
    build: function (svg) {
      const mats = [
        { x: 40, v: [[1, 2], [3, 4]], accent: false },
        { x: 180, v: [[0, 1], [1, 0]], accent: false },
        { x: 320, v: [[2, 1], [4, 3]], accent: true }
      ];
      let out = '';
      mats.forEach(m => {
        const L = m.x, R = m.x + 100, top = 92, bot = 208;
        out += `<path class="ink" d="M${L + 11} ${top} H ${L} V ${bot} H ${L + 11}"/>
                <path class="ink" d="M${R - 11} ${top} H ${R} V ${bot} H ${R - 11}"/>`;
        m.v.forEach((row, r) => {
          row.forEach((val, c) => {
            const cx = L + 32 + c * 38;
            const cy = 136 + r * 46;
            out += `<text x="${cx}" y="${cy}" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="25" font-weight="600" style="fill:${m.accent ? 'var(--accent)' : '#18181b'}">${val}</text>`;
          });
        });
      });
      return svg.replace('<g id="matrices"></g>', out);
    }
  },
  {
    slug: 'percentage', file: 'tools/percentage.html', img: 'percentage-calculator.png',
    cat: 'Math', name: 'Percentage Calculator',
    tagline: 'Percent of a number, percentage change and what-percent-of, in one place.',
    accent: '#0284c7',
    alt: 'Donut showing 35 percent, with 35 percent of 240 equal to 84',
    spec: '35% of 240 <span class="sep">&middot;</span> 240 &times; 0.35 <span class="sep">&middot;</span> <b>84</b>',
    art: `
      <circle cx="126" cy="150" r="72" fill="none" stroke="#e4e4e7" stroke-width="18"/>
      <circle cx="126" cy="150" r="72" fill="none" style="stroke:var(--accent)" stroke-width="18"
        stroke-dasharray="158.3 452.4" transform="rotate(-90 126 150)"/>
      <text x="126" y="160" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="28" font-weight="600" fill="#18181b">35%</text>
      <text x="246" y="124" class="lbl-s">35% OF 240</text>
      <text x="246" y="176" class="num-a" font-size="38">84</text>
      <path class="hair" d="M246 200 H 430"/>
      <text x="246" y="226" class="lbl-s">CHANGE . DIFFERENCE</text>`
  },
  {
    slug: 'gear', file: 'tools/gear.html', img: 'gear-ratio-calculator.png',
    cat: 'Mechanical', name: 'Gear Ratio Calculator',
    tagline: 'Gear ratio, output RPM and torque from tooth counts, with live animation.',
    accent: '#ea580c',
    alt: 'A 24 tooth gear driving a 16 tooth gear, a 3 to 2 ratio',
    spec: '24 T &rarr; 16 T <span class="sep">&middot;</span> in 1000 rpm <span class="sep">&middot;</span> <b>1500 rpm, 3:2</b>',
    art: `
      <circle cx="132" cy="150" r="76" fill="none" stroke="#18181b" stroke-width="13" stroke-dasharray="9 10.9"/>
      <circle cx="132" cy="150" r="69.5" fill="#ffffff" stroke="#18181b" stroke-width="1.8"/>
      <circle cx="132" cy="150" r="19" class="fillpale" stroke="#18181b" stroke-width="1.8"/>
      <circle cx="258" cy="150" r="50.7" fill="none" stroke="#18181b" stroke-width="13" stroke-dasharray="9 10.9"/>
      <circle cx="258" cy="150" r="44.2" fill="#ffffff" stroke="#18181b" stroke-width="1.8"/>
      <circle cx="258" cy="150" r="13" class="fillpale" stroke="#18181b" stroke-width="1.8"/>
      <text x="132" y="262" class="lbl-s" text-anchor="middle">24 T</text>
      <text x="258" y="262" class="lbl-s" text-anchor="middle">16 T</text>
      <text x="382" y="142" class="num-a" text-anchor="middle">3:2</text>
      <text x="382" y="170" class="lbl-s" text-anchor="middle">RATIO</text>`
  },
  {
    slug: 'unit-convertor', file: 'tools/unit-convertor.html', img: 'unit-converter.png',
    cat: 'Utilities', name: 'Unit Converter',
    tagline: 'Length, area, volume, mass, temperature, power and pressure in one place.',
    accent: '#d97706',
    alt: 'One kilogram converted to 35.274 ounces',
    spec: '1 kg <span class="sep">&middot;</span> 1000 g <span class="sep">&middot;</span> 2.2046 lb <span class="sep">&middot;</span> <b>35.274 oz</b>',
    art: `
      <rect x="20" y="88" width="180" height="88" class="fillnone" stroke="#d4d4d8" stroke-width="1"/>
      <text x="38" y="120" class="lbl-s">KILOGRAMS</text>
      <text x="38" y="156" class="num">1</text>
      <path class="ink" d="M214 132 H 246"/>
      <path d="M246 132 l -9 -4.5 l 0 9 Z" fill="#18181b"/>
      <rect x="260" y="88" width="180" height="88" class="fillnone" stroke="#d4d4d8" stroke-width="1"/>
      <text x="278" y="120" class="lbl-s">OUNCES</text>
      <text x="278" y="156" class="num-a">35.274</text>
      <text x="230" y="222" class="lbl-s" text-anchor="middle">km / mi . &deg;C / &deg;F . L / gal . psi / bar</text>`
  },
  {
    slug: 'home', file: '', img: 'pocketengineer-engineering-tools.png',
    cat: 'Free Engineering Tools', name: 'Engineering Calculators',
    tagline: 'Nineteen calculators and visual tools for electronics, geometry, math and code.',
    accent: '#2563eb',
    alt: 'PocketEngineer free engineering calculators and visualization tools',
    spec: '19 tools <span class="sep">&middot;</span> electronics, geometry, math, code <span class="sep">&middot;</span> <b>free, no sign-up</b>',
    art: `<g id="tiles"></g>`,
    build: function (svg) {
      const tiles = [
        { g: '&#8486;', l: 'OHMS LAW', a: true }, { g: '%', l: 'PERCENT' }, { g: '101', l: 'BINARY' },
        { g: '&pi;', l: 'CIRCLE' }, { g: '&radic;', l: 'PYTHAGORAS' }, { g: '[ ]', l: 'MATRIX' }
      ];
      let out = '';
      tiles.forEach((t, i) => {
        const x = 20 + (i % 3) * 144;
        const y = 56 + Math.floor(i / 3) * 104;
        out += `<rect x="${x}" y="${y}" width="132" height="88" class="fillnone" stroke="${t.a ? 'var(--accent)' : '#d4d4d8'}" stroke-width="${t.a ? 1.8 : 1}"/>
                <text x="${x + 66}" y="${y + 46}" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="26" font-weight="600" style="fill:${t.a ? 'var(--accent)' : '#18181b'}">${t.g}</text>
                <text x="${x + 66}" y="${y + 70}" text-anchor="middle" class="lbl-s">${t.l}</text>`;
      });
      return svg.replace('<g id="tiles"></g>', out);
    }
  }
];

if (typeof module !== 'undefined') module.exports = TOOLS;
