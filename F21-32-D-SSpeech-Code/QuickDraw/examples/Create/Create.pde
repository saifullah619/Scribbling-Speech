// Import the Quick Draw For Processing Library
import cbl.quickdraw.*;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

// Initialize a QuickDraw object from the library
QuickDraw qd;
String input;

void setup() {
  size(400, 400);
  
  try {
    fileRead();
  } catch (FileNotFoundException fnfe) {
    fnfe.printStackTrace();
  }

  // We pass "this" to QuickDraw so that it can load files from the
  // data directory

  qd = new QuickDraw(this, input);
}

void draw() {
  background(255);

  int divisor = 2;
  float scale = width/divisor*.75;
  int index = 0;

  // Increments the coordinates of the drawing
  // Draws the drawing to the screen
  // Increments the index for which drawing's data is used

  for (int i = 1; i < divisor; i++) {
    for (int j = 1; j < divisor; j++) {
      qd.create(width/divisor*i, width/divisor*j, scale, scale, index);
      index++;
    }
  }
}

void fileRead() throws FileNotFoundException {
    File file = new File("D:\\QuickDraw\\examples\\demo.txt");
    Scanner sc = new Scanner(file);
 
    // we just need to use \\Z as delimiter
    sc.useDelimiter("\\Z");
 
    input = sc.next();
    input = input + ".ndjson";
    println(input);
    sc.close();
}
