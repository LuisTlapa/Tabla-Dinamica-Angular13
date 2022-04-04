import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { merge, Observable, of } from 'rxjs';

class Todo {
  id!: string;
  description!: string;
  complete!: boolean;
  nombre!: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor() {
    const todos: Todo[] = [
      {
        id: '123',
        description: 'Complete me!',
        nombre: 'Luis',
        complete: false,
      },
    ];


    this.dataSource = new MatTableDataSource(todos);
    merge(
      this.id!.valueChanges,
      this.description!.valueChanges,
      this.nombre!.valueChanges
    ).subscribe(() => {
      this.displayedColumns$ = of(
        this.columnDefinitions.filter((c) => c.cb?.value).map((c) => c.def)
      );
    });
  }

  form: FormGroup = new FormGroup({
    id: new FormControl(false),
    description: new FormControl(false),
    nombre: new FormControl(false),
  });


  id = this.form.get('id');
  description = this.form.get('description');
  nombre = this.form.get('nombre');

  columnDefinitions = [
    { def: 'id', label: 'ID', cb: this.id },
    { def: 'description', label: 'Description', cb: this.description },
    { def: 'nombre', label: 'nombre', cb: this.nombre },
  ];

  displayedColumns$: Observable<string[]> = of(
    this.columnDefinitions.map((c) => c.def)
  );

  dataSource: MatTableDataSource<Todo>;

}
