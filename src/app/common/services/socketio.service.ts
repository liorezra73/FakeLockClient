import { Injectable } from "@angular/core";
import * as io from "socket.io-client";
import { ISocketiotService } from "../intefaces/socketio.service.interface";
import { environment } from "src/environments/environment";
import { Post } from "../models/Post";

@Injectable({
  providedIn: "root",
})
export class SocketioService implements ISocketiotService {
  socket;

  constructor() {}

  setupSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT);
    console.log(this.socket);
  }

  emit(event: string) {
    this.setupSocketConnection();
    this.socket.emit(event);
  }

  onLikes(event: string, post: Post) {
    this.setupSocketConnection();
    this.socket.on(event, (data: number) => {
      post.likes = data;
    });
  }

  onComments(event: string, post: Post) {
    this.setupSocketConnection();
    this.socket.on(event, (data: any) => {
      post.commentsCount = data;
    });
  }
}
