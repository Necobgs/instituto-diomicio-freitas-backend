const fs = require('fs');
const file = 'C:\\Users\\emanu\\project\\instituto-diomicio-freitas-backend\\src\\domain\\evaluation\\entities\\evaluation.entity.ts';
let content = fs.readFileSync(file, 'utf8');

let fields = '';
for (let i = 2; i <= 49; i++) {
    let q = i.toString().padStart(2, '0');
    fields += `    @Column({ type: 'char', length: 1, nullable: true })\r\n    @IsString()\r\n    @Length(1, 1)\r\n    @IsOptional()\r\n    q${q}: string;\r\n\r\n`;
}

// Find q50 and insert fields before its column annotation
const anchorRegex = /([ \t]*)@Column\(\{ type: 'char', length: 1, nullable: true \}[\s\n\r]*@IsString\(\)[\s\n\r]*@Length\(1, 1\)[\s\n\r]*@IsOptional\(\)[\s\n\r]*q50: string;/;

if (anchorRegex.test(content)) {
    content = content.replace(anchorRegex, `\n${fields}$&`);
    fs.writeFileSync(file, content);
    console.log('Fields injected successfully.');
} else {
    console.log('Anchor not found!');
}
