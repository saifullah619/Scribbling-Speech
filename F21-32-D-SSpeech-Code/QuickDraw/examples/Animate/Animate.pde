import com.hamoid.*;

// Import the Quick Draw For Processing Library
import cbl.quickdraw.*;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

VideoExport videoExport;

// Initialize a QuickDraw object from the library
QuickDraw qd;
String input;
String movie;

float end, x;

void setup() {
  size(400, 400);
  
  try {
    fileRead();
  } catch (FileNotFoundException fnfe) {
    fnfe.printStackTrace();
  }

  videoExport = new VideoExport(this, movie + ".mp4");
  videoExport.startMovie();
  
  // We pass "this" to QuickDraw so that it can load files from the
  // data directory
  qd = new QuickDraw(this, input);
}

void draw() {
  background(255);

  float scale = height/2;

  endUpdate();
  qd.create(width/2, height/2, scale, scale, end);
  
  videoExport.saveFrame();
}

// Update end back and forth between 0 and 1 

void endUpdate() {
  float inc = .005;
  end = abs(sin(x));
  x = x + inc;
}

void fileRead() throws FileNotFoundException {
    File file = new File("D:\\QuickDraw\\examples\\demo.txt");
    Scanner sc = new Scanner(file);
 
    // we just need to use \\Z as delimiter
    sc.useDelimiter("\\Z");
 
    input = sc.next();
    movie = input;
    input = input + ".ndjson";
    sc.close();
}
