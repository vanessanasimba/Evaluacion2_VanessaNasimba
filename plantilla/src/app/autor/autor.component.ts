import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedModule } from '../theme/shared/shared.module';
import { IAutor } from '../Interfaces/iautor';
import { AutorService } from '../Services/autor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-autor',
  standalone: true,
  imports: [RouterLink,SharedModule],
  templateUrl: './autor.component.html',
  styleUrl: './autor.component.scss'
})
export class AutorComponent {
  listaAutor: IAutor[] = [];

  constructor(private autorServicio: AutorService) {}
  ngOnInit(): void {
    this.autorServicio.todos().subscribe((data: IAutor[]) => {
      this.listaAutor = data;
    });
  }

  cargatabla() {
    this.autorServicio.todos().subscribe((data: IAutor[]) => {
      this.listaAutor = data;
    });
  }


  eliminar(autor_id) {
    Swal.fire({
      title: 'Autor',
      text: 'Esta seguro que desea eliminar el autor!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f00',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar Autor'
    }).then((result) => {
      if (result.isConfirmed) {
        this.autorServicio.eliminar(autor_id).subscribe((data) => {
          Swal.fire('Autor', 'El autor ha sido eliminado.', 'success');
          this.cargatabla();
        });
      }
    });
  }

}
