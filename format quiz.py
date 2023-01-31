# open files for import and export
format_file = open("quiz_unformatted.txt", 'r')
output_file = open("quiz_formatted.js", 'w')

while (True):
    line = format_file.readline()
    
    if line == "":
        break
    else:
        print(line)
        output_file.write(line)
    