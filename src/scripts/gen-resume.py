#!/usr/bin/python

import sys, getopt

def main(argv):
   inputfile = ''
   outputfile = ''
   try:
      opts, args = getopt.getopt(argv,"hi:o:",["ifile=","ofile="])
   except getopt.GetoptError:
      print('test.py -i <inputfile> -o <outputfile>')
      sys.exit(2)
   for opt, arg in opts:
      if opt in ("-i", "--ifile"):
         inputfile = arg
      elif opt in ("-o", "--ofile"):
         outputfile = arg

   convertFile(inputfile, outputfile)
      
def convertFile(inputFile, outputFile):
   try:
      fileIn = open(inputFile, "r")
      fileOut = open(outputFile, "w")
      for line in fileIn:
         fileOut.write(convertLine(line))

      fileIn.close()
      fileOut.close()
      print("success!\n")

   except IOError:
      print("IOError. Exiting.")
      sys.exit()

def convertLine(line):
   if len(line) == 1:
      # add break to empty lines
      return "<br>\n"
   else:
      # replace ' ' with physical space
      if (len(line) != 80):
         return line.replace(" ", "&nbsp;")
      else: 
         return line.replace(" ", "&nbsp;")

if __name__ == "__main__":
   main(sys.argv[1:])