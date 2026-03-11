const fs = require('fs');
const file = 'c:\\Users\\emanu\\project\\instituto-diomicio-freitas-backend\\src\\domain\\evaluation\\entities\\evaluation.entity.ts';
let content = fs.readFileSync(file, 'utf8');
let fields = '';
for (let i = 2; i <= 49; i++) {
    let q = i.toString().padStart(2, '0');
    fields += `    @Column({ type: 'char', length: 1, nullable: true })\n    @IsString()\n    @Length(1, 1)\n    @IsOptional()\n    q${q}: string;\n\n`;
}
content = content.replace(/[ \t]*\/\/[ \t]*\.\.\.[ \t]*\(Repetir para q02 at[eé] q49\)/, fields.trimEnd());
fs.writeFileSync(file, content);
console.log('Update complete.');
