# open files for import and export
format_file = open("test_input_wwt1.txt", 'r')
output_file = open("test_output_wwt1.js", 'w')

# constants for REGEX ? 
removed_prefix = ["a)", "b)", "c)", "d)", "A.", "B.", "C.", "D.", "a.", "b.", "c.", "d."]

output_file.write("const questions_WWT1 = [")

# counter for processing data
counter = 0

# loop through unformatted file; write to formatted file
while (True):   
    line = format_file.readline()
    
    # filter out a) / b) / c) / d)
    if (line[:2] in removed_prefix):
        line = line[2:]
    else:
        line = line
        
    if line == "":
        break
    
    if line == "\n":
        old_value = counter
        counter = -1
    

    if (counter == 0):
        output_file.write("\n[\"" + line[:-1] + "\",")
        counter += 1
    elif (counter == 4):
        output_file.write("\"" + line[:-1] + "\"],")
        counter = 0
    elif (counter == 4):
        output_file.write("\"" + line[:-1] + "\"")
        counter += 1
    elif (counter == -1):
        counter = old_value
    else:
        output_file.write("\"" + line[:-1] + "\"" + ",")
        counter += 1
    
        
    
output_file.write("]")

format_file.close
output_file.close