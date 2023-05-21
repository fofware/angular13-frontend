import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-rubro',
  templateUrl: './rubro.component.html',
  styleUrls: ['./rubro.component.css']
})
export class RubroComponent implements OnInit {
  data:any[] = [];
  loading = false;
  offset: number | boolean = 0;
  nextOffset: number | boolean = 0;
  count = 0;
  limit = 50;
  searchItem = '';

  constructor(    private apiSrv: ApiService ) { }

  ngOnInit(): void {
    this.setData()
  }
  setData(){
    if(this.loading) return;
    if(this.nextOffset === false) return;
    this.loading = true;
    const params = {
      limit: this.limit,
      offset: this.nextOffset,
      searchItem: this.searchItem
    };
    this.apiSrv.get('/rubros',params).subscribe((data:any) => {
      console.log(data);
      this.count = data.count;
      this.offset = data.offset;
      this.nextOffset = data.nextOffset;
      this.data = this.data.concat(data.rows);
      console.log(this.data.length);
      console.log(data.apiTime);
      this.loading = false;
    });
  }
}