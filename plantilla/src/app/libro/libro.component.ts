import { Component } from '@angular/core';
import { ILibro } from '../Interfaces/ilibro';
import { LibroService } from '../Services/libro.service';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';
import { SharedModule } from '../theme/shared/shared.module';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-libro',
  standalone: true,
  imports: [RouterLink,SharedModule],
  templateUrl: './libro.component.html',
  styleUrl: './libro.component.scss'
})
export class LibroComponent {
  listaLibro: ILibro[] = [];

  constructor(private libroServicio: LibroService) {}

  ngOnInit(): void {
    this.libroServicio.todos().subscribe((data: ILibro[]) => {
      this.listaLibro = data;
    });
  }

  cargatabla() {
    this.libroServicio.todos().subscribe((data: ILibro[]) => {
      this.listaLibro = data;
    });
  }

  eliminar(libro_id) {
    Swal.fire({
      title: 'Libro',
      text: 'Esta seguro que desea eliminar el Libro!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f00',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar Libro'
    }).then((result) => {
      if (result.isConfirmed) {
        this.libroServicio.eliminar(libro_id).subscribe((data) => {
          Swal.fire('Libro', 'El libro ha sido eliminado.', 'success');
          this.cargatabla();
        });
      }
    });
  }

  descargarReporte(){
    const Data: any = document.getElementById('impresion');
    html2canvas(Data).then((html) => {
      const anchoOriginal = html.width;
      const altoOriginal = html.height;
      const imgAncho = (anchoOriginal*1*150)/anchoOriginal;
      const imgAlto = (altoOriginal*1*50)/altoOriginal;
      const contenido = html.toDataURL('image/png');
      let pdf = new jsPDF('p', 'mm', 'a4');
      const position = 0;
      pdf.addImage(contenido, 'PNG', 0, position, imgAncho, imgAlto);
      pdf.save('Libro.pdf');
    });
  }
}
