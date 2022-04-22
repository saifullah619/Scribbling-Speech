import websockets.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

WebsocketServer socket;

void setup() {
  socket = new WebsocketServer(this, 1337, "/p5websocket");
}

void draw() {
  background(0);
}

void webSocketServerEvent(String msg) throws IOException {
    Path fileName = Path.of("D:\\QuickDraw\\examples\\demo.txt");
 
    // Writing into the file
    Files.writeString(fileName, msg.toLowerCase());
}
