const fs = require('fs');
const file = 'C:\\Users\\emanu\\project\\instituto-diomicio-freitas-backend\\src\\domain\\evaluation\\entities\\evaluation.entity.ts';
const content = fs.readFileSync(file, 'utf8');

let fields = '\\r\\n';
for (let i = 2; i <= 49; i++) {
    let q = i.toString().padStart(2, '0');
    fields += `    @Column({ type: 'char', length: 1, nullable: true })\\r\\n    @IsString()\\r\\n    @Length(1, 1)\\r\\n    @IsOptional()\\r\\n    q${q}: string;\\r\\n\\r\\n`;
}

// The comment was deleted in the previous step, leaving an empty line
// Let's replace the space before q50 with the new fields
const parts = content.split('q50: string;');
// We can just find the part before q50 and insert the fields after q01
const regex = /(q01: string;[\r\n\s]*)(@Column\(\{ type: 'char', length: 1, nullable: true \}[\r\n\s]*@IsString\(\)[\r\n\s]*@Length\(1, 1\)[\r\n\s]*@IsOptional\(\)[\r\n\s]*q50: string;)/;

const newContent = content.replace(regex, `$1${fields.trimEnd()}\\r\\n\\r\\n    $2`);
fs.writeFileSync(file, newContent);
console.log('Injected properly.');
