import { CommonModule, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IAutor } from 'src/app/Interfaces/iautor';
import { AutorService } from 'src/app/Services/autor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-nuevoautor',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,CommonModule],
  templateUrl: './nuevoautor.component.html',
  styleUrl: './nuevoautor.component.scss'
})
export class NuevoautorComponent implements OnInit{
  titulo = 'Nueva Autor';
  autor_id = 0;

  frm_autor: FormGroup;

  constructor(
    private autorServicio: AutorService,
    private navegacion: Router,
    private ruta: ActivatedRoute,
    private modal: NgbModal
  ) {}

  ngOnInit(): void {
    this.frm_autor = new FormGroup({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      fecha_nacimiento: new FormControl('', Validators.required),
      nacionalidad: new FormControl('', Validators.required)
    });

    this.autor_id = parseInt(this.ruta.snapshot.paramMap.get('idautor'));
    if (this.autor_id > 0) {
      this.autorServicio.uno(this.autor_id).subscribe((x) => {
        this.frm_autor.controls['nombre'].setValue(x.nombre);
        this.frm_autor.controls['apellido'].setValue(x.apellido);
        this.frm_autor.controls['fecha_nacimiento']?.setValue(x.fecha_nacimiento);
        this.frm_autor.controls['nacionalidad']?.setValue(x.nacionalidad);
        this.titulo = 'Editar Autor';
      });
    }

  }

  grabar() {
    let autor: IAutor= {
      nombre: this.frm_autor.value.nombre,
      apellido: this.frm_autor.value.apellido,
      fecha_nacimiento: this.frm_autor.value.fecha_nacimiento,
      nacionalidad: this.frm_autor.value.nacionalidad,
    };
     if (this.autor_id == 0 || isNaN(this.autor_id)){
      this.autorServicio.insertar(autor).subscribe((respuesta) => {
        if (parseInt(respuesta) > 0) {
          Swal.fire('Exito', 'El autor se grabo con exito', 'success');
          this.navegacion.navigate(['/autor']);
        }
      });
     } else{
      autor.autor_id = this.autor_id;
      this.autorServicio.actualizar(autor).subscribe((respuesta) => {
        Swal.fire('Exito', 'El autor se modifico con exito', 'success');
        this.navegacion.navigate(['/autor']);
      });
     }

  }

}
