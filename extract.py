import xml.etree.ElementTree as ET

tree = ET.parse(r'd:\portfolio\MinhSon-Portfolio\temp_docx\word\document.xml')
root = tree.getroot()
namespace = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
text = ''
for p in root.findall('.//w:p', namespace):
    for r in p.findall('.//w:r', namespace):
        for t in r.findall('.//w:t', namespace):
            if t.text:
                text += t.text
    text += '\n'
with open(r'd:\portfolio\MinhSon-Portfolio\docx_text.txt', 'w', encoding='utf-8') as f:
    f.write(text)
