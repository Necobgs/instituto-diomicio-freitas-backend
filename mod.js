const fs = require('fs');
const file = 'C:\\Users\\emanu\\project\\instituto-diomicio-freitas-backend\\src\\domain\\evaluation\\entities\\evaluation.entity.ts';
let content = fs.readFileSync(file, 'utf8');

let fields = '';
for (let i = 2; i <= 49; i++) {
    let q = i.toString().padStart(2, '0');
    fields += `    @Column({ type: 'char', length: 1, nullable: true })\r\n    @IsString()\r\n    @Length(1, 1)\r\n    @IsOptional()\r\n    q${q}: string;\r\n\r\n`;
}

// target q50
const target = "    @Column({ type: 'char', length: 1, nullable: true })\r\n    @IsString()\r\n    @Length(1, 1)\r\n    @IsOptional()\r\n    q50: string;";

if (content.includes("q50: string;")) {
    const parts = content.split("    @Column({ type: 'char', length: 1, nullable: true })\n    @IsString()\n    @Length(1, 1)\n    @IsOptional()\n    q50: string;");
    // Wait, let's just use string split on `q50: string;`
    // Actually, just find the last `@Column` before q50.

    // Safer:
    content = content.replace("    q50: string;", "\n" + fields.trimEnd() + "\n\n    q50: string;");
    fs.writeFileSync(file, content);
    console.log('DONE!');
} else {
    console.log('NOT FOUND');
}
