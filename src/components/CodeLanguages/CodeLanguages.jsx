import React from 'react';
import './CodeLanguages.css';

const languages = [
  { name: 'JavaScript', color: '#f7df1e' ,src:'https://code.visualstudio.com/assets/home/language-js.png'},
  {  name: 'TypeScript', color: '#007acc' ,src:'https://code.visualstudio.com/assets/home/language-ts.png'},
  {  name: 'Python' ,src:'https://code.visualstudio.com/assets/home/language-python.png'},
  {  name: 'C#', color: '#9b4f96' ,src:'https://code.visualstudio.com/assets/home/language-cs.png'},
  {  name: 'C++', color: '#00599c', src:'https://code.visualstudio.com/assets/home/language-cpp.png'},
  {  name: 'HTML', color: '#e34c26' ,src:'https://code.visualstudio.com/assets/home/language-html.png'},
  {  name: 'Java', color: '#cc2020' ,src:'https://code.visualstudio.com/assets/home/language-java.png'},
  {  name: 'JSON', color: '#f1e05a' ,src:'https://code.visualstudio.com/assets/home/language-json.png'},
  {  name: 'PHP', color: '#8892be' ,src:'https://code.visualstudio.com/assets/home/language-php.png'},
  {  name: 'Markdown' ,src:'https://code.visualstudio.com/assets/home/language-markdown.png'},
  {  name: 'Powershell', color: '#012456' ,src:'https://code.visualstudio.com/assets/home/language-powershell.png'},
  {  name: 'YAML', color: '#f2f2f2' ,src:'https://code.visualstudio.com/assets/home/language-yaml.png'},
];

const CodeLanguages = () => {
  return (
    <div className="code-languages-container">
      <div className="description">
        <h1>Code in any language</h1>
        <p>
          VS Code supports almost every major programming language. Several ship in the box,
          like JavaScript, TypeScript, CSS, and HTML, but extensions for others can be found
          in the VS Code Marketplace.
        </p>
      </div>

      <div className="languages-grid">
        {languages.map((lang, i) => (
          <div key={i} className="language-item">
            <img src={lang.src} alt="" />
            <span className="language-name">{lang.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CodeLanguages;
