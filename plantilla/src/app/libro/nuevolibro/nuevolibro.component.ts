import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IAutor } from 'src/app/Interfaces/iautor';
import { ILibro } from 'src/app/Interfaces/ilibro';
import { AutorService } from 'src/app/Services/autor.service';
import { LibroService } from 'src/app/Services/libro.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-nuevolibro',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,CommonModule],
  templateUrl: './nuevolibro.component.html',
  styleUrl: './nuevolibro.component.scss'
})
export class NuevolibroComponent implements OnInit{
 
  titulo = 'Nueva Libro';
  libro_id = 0;
  frm_libro: FormGroup;
  listaAutor: IAutor[] = [];

  constructor(
    private libroServicio: LibroService,
    private navegacion: Router,
    private ruta: ActivatedRoute,
    private modal: NgbModal,
    private autorServicio: AutorService
  ) {}

  ngOnInit(): void {
    this.crearFormulario();
    this.autorServicio.todos().subscribe((data) => (this.listaAutor = data));

    this.libro_id = parseInt(this.ruta.snapshot.paramMap.get('idlibro'));
    if (this.libro_id > 0) {
      this.libroServicio.uno(this.libro_id).subscribe((x) => {
        this.frm_libro.controls['titulo'].setValue(x.titulo);
        this.frm_libro.controls['isbn'].setValue(x.isbn);
        this.frm_libro.controls['genero'].setValue(x.genero);
        this.frm_libro.controls['fecha_publicacion'].setValue(x.fecha_publicacion);
        this.frm_libro.controls['autor_id'].setValue(x.autor_id);
        this.titulo = 'Editar Libro';
      });
    }

  }

  crearFormulario() {
  
    this.frm_libro = new FormGroup({
      titulo: new FormControl('', Validators.required),
      isbn: new FormControl('', Validators.required),
      genero: new FormControl('', Validators.required),
      fecha_publicacion: new FormControl('', Validators.required),
      autor_id: new FormControl('', Validators.required)
    });
  }

  grabar() {
    let libro: ILibro= {
      titulo: this.frm_libro.value.titulo,
      isbn: this.frm_libro.value.isbn,
      genero: this.frm_libro.value.genero,      
      fecha_publicacion: this.frm_libro.value.fecha_publicacion,
      autor_id: this.frm_libro.value.autor_id
    };
     if (this.libro_id == 0 || isNaN(this.libro_id)){
      this.libroServicio.insertar(libro).subscribe((respuesta) => {
        if (parseInt(respuesta) > 0) {
          Swal.fire('Exito', 'El libro se grabo con exito', 'success');
          this.navegacion.navigate(['/libro']);
        }
      });
     } else{
      libro.libro_id = this.libro_id;
      this.libroServicio.actualizar(libro).subscribe((respuesta) => {
        Swal.fire('Exito', 'El libro se modifico con exito', 'success');
        this.navegacion.navigate(['/libro']);
      });
     }

  }

  cambioAutor(objetoSleect: any) {
    let autor_id = objetoSleect.target.value;
    this.frm_libro.get('autor_id')?.setValue(autor_id);
  }

}
