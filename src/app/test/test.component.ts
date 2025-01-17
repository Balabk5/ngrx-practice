import { Component } from '@angular/core';
import { Observable, bufferTime, finalize, from, interval, map, mergeAll, mergeMap, of, switchMap, tap, toArray } from 'rxjs';

import { increment, decrement, reset } from '../state/counter.actions';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { addTask } from '../state/tasks/tasks.action';


interface User {
  id: number;
  name: string;
  isActive: boolean;
}

 interface UserDetails {
  userId: number;
  address: string;
  phone: string;
}
interface stockDataStream{
  ticker: string,
  price: number,
  volume:number,
  timestamp: Date
}
@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})


export class TestComponent {
  activeUserNames$: Observable<string[]> | undefined;
  loading: boolean = false
  userDetailList$: Observable<{ name: string; details: UserDetails; }[]> | undefined;
  count$!: Observable<number>;



  private users: User[] = [
    { id: 1, name: 'Alice', isActive: true },
    { id: 2, name: 'Bob', isActive: false },
    { id: 3, name: 'Charlie', isActive: true },
    { id: 4, name: 'David', isActive: false },
    { id: 5, name: 'Eve', isActive: true },
    { id: 6, name: 'Frank', isActive: true },
    { id: 7, name: 'Grace', isActive: false }
  ];  

  stockDataStream: stockDataStream[] = [
    { ticker: 'AAPL', price: 150.30, volume: 1200, timestamp: new Date('2023-10-01T10:00:00Z') },
    { ticker: 'AAPL', price: 150.50, volume: 900, timestamp: new Date('2023-10-01T10:01:00Z') },
    { ticker: 'TSLA', price: 700.20, volume: 2000, timestamp: new Date('2023-10-01T10:01:10Z') },
    { ticker: 'AAPL', price: 151.00, volume: 1100, timestamp: new Date('2023-10-01T10:02:00Z') },
    { ticker: 'GOOG', price: 2800.10, volume: 800, timestamp: new Date('2023-10-01T10:02:15Z') },
    { ticker: 'TSLA', price: 702.50, volume: 3000, timestamp: new Date('2023-10-01T10:03:00Z') },
    { ticker: 'AAPL', price: 150.75, volume: 1300, timestamp: new Date('2023-10-01T10:04:00Z') },
    { ticker: 'AAPL', price: 151.25, volume: 1400, timestamp: new Date('2023-10-01T10:05:00Z') },
    { ticker: 'TSLA', price: 704.00, volume: 2500, timestamp: new Date('2023-10-01T10:05:20Z') },
    { ticker: 'GOOG', price: 2801.00, volume: 850, timestamp: new Date('2023-10-01T10:05:30Z') },
    { ticker: 'AAPL', price: 151.50, volume: 1500, timestamp: new Date('2023-10-01T10:06:00Z') },
    { ticker: 'TSLA', price: 706.00, volume: 2600, timestamp: new Date('2023-10-01T10:07:00Z') },
    { ticker: 'GOOG', price: 2805.00, volume: 900, timestamp: new Date('2023-10-01T10:07:15Z') },
    { ticker: 'AAPL', price: 151.75, volume: 1600, timestamp: new Date('2023-10-01T10:08:00Z') },
    { ticker: 'TSLA', price: 707.50, volume: 2700, timestamp: new Date('2023-10-01T10:09:00Z') },
    { ticker: 'GOOG', price: 2810.00, volume: 950, timestamp: new Date('2023-10-01T10:09:10Z') },
    { ticker: 'AAPL', price: 152.00, volume: 1700, timestamp: new Date('2023-10-01T10:10:00Z') },
    { ticker: 'TSLA', price: 709.00, volume: 2800, timestamp: new Date('2023-10-01T10:11:00Z') },
    { ticker: 'GOOG', price: 2812.50, volume: 1000, timestamp: new Date('2023-10-01T10:12:00Z') },
    { ticker: 'AAPL', price: 152.25, volume: 1800, timestamp: new Date('2023-10-01T10:12:30Z') },
  ];
  
  constructor(private store: Store<{ count: number; task: { id: string; title: string; status: string }[] }>
  ){
    this.count$ = store.select('count');
  }

  ngOnInit() {
    // this.getUsers();
    // console.log(this.getActiveUserName().subscribe({
    //   next:(res)=>{
    //     console.log(res)
    //   },
    //   error:(err)=>{
    //     console.error(err);
        
    //   }
    // }))

    // console.log(this.getStocksAbove200$().subscribe({
    //   next:(res)=>{
    //     console.log(res);
    //   },
    //   error:(err)=>{
    //     console.error(err);
        
    //   }
    // }))

    this.store.select('task').subscribe((tasks) => {
      console.log('tasks',tasks); // Logs the array of tasks
    });
    
  }

 

  getUserDetails(userId: number): Observable<UserDetails> {
    const userDetails: UserDetails = {
      userId: userId,
      address: `Address for user ${userId}`,
      phone: `Phone number for user ${userId}`
    };
    return of(userDetails);
  }
  getUsers(): Observable<User[]> {
    return of(this.users);
  }

  getActiveUserName() {
    this.userDetailList$ = this.getUsers().pipe(
      tap(() => this.loading = true), // Show loading spinner
      map((users: User[]) => users.filter(user => user.isActive && user.name.startsWith('A'))), // Filter users who are active and names start with 'A'
      tap(users => localStorage.setItem('filteredUsers', JSON.stringify(users))), // Cache filtered users
      switchMap((users: User[]) => from(users).pipe(
        mergeMap(user => this.getUserDetails(user.id).pipe(
          map(details => ({ name: user.name, details }))
        )),
        toArray()
      )),
      finalize(() => this.loading = false) // Hide loading spinner
    );
    return this.userDetailList$
  }

  getStreamStockData(): Observable<stockDataStream[]> {
    return interval(1000).pipe( // Emits every second
      map(() => this.stockDataStream) // Replace this with real-time stock updates
    );
  }
  

  getStocksAbove200$(): Observable<stockDataStream[]> {
    let stockdata: Observable<stockDataStream[]>
 
    stockdata = this.getStreamStockData().pipe(
      bufferTime(5000), 
      map(bufferedStocks => 
        bufferedStocks.map(stocks => stocks.filter(stock=>{
          return stock.price > 200
        }))
      ),
      mergeAll() // Flatten each array of stocks after filtering
    );
    return stockdata

  }

  
  
  onIncrement() {
    this.store.dispatch(increment());
  }

  onDecrement() {
    this.store.dispatch(decrement());
  }

  onReset() {
    this.store.dispatch(reset());
  }

  addNewTask() {
    const newTask = {
      id: Math.random().toString(36).substr(2, 9), // Generate random ID
      title: 'New Task',
      status: 'pending',
    };
    this.store.dispatch(addTask(newTask));
  }

}
