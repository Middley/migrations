import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
@Injectable({
  providedIn: 'root'
})
export class SignalRSmartPrintingService {

  private connection: signalR.HubConnection | undefined;
  constructor() { }

  startConnection() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:5001/PrintingServiceHub', {
        transport: signalR.HttpTransportType.WebSockets,
        accessTokenFactory: () => localStorage.getItem("accessToken"),
        skipNegotiation: true,
        withCredentials: true,
      })
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this.connection.start().then(() => {
      console.log('SignalR connection started successfully.');
    }).catch((err) => {
      console.error('Error starting SignalR connection: ' + err);
    });
  }

  // addReceiveStockPriceListener(callback: (stockName: string, stockPrice: number) => void) {
  //   if (this.connection) {
  //     this.connection.on('ReceiveStockPrice', callback);
  //   }
  // }

  invokePrinterServiceHub() {
    if (this.connection) {
      this.connection.invoke("CallHub").catch(error => {
        console.log(error);
      })
    }
  }

}
