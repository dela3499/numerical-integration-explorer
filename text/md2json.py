import markdown
import json

# Specify all markdown files for conversion
markdownFiles = [
    'markdown/main.md'
]

# Iterate through each markdown file
allText = []
for mdFile in markdownFiles:
    f = open(mdFile,'r')
    # append compiled string to master list (and remove newlines)
    allText.append(markdown.markdown(f.read()).replace("\n",""))
    f.close()

# Write output to file
outFile = open('prose.json','w')
outFile.write(json.dumps(allText))
outFile.close()