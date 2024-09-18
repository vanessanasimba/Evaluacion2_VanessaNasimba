import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILibro } from '../Interfaces/ilibro';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  apiurl = 'http://localhost:8080/Vanessa_Nasimba_Evaluacion2/controller/libro.controller.php?op=';

  constructor(private lector: HttpClient) { }

  todos(): Observable<ILibro[]> {
    return this.lector.get<ILibro[]>(this.apiurl + 'todos');
  }

  uno(libro_id: number): Observable<ILibro> {
    const formData = new FormData();
    formData.append('libro_id', libro_id.toString());
    return this.lector.post<ILibro>(this.apiurl + 'uno', formData);
  }

  eliminar(libro_id: number): Observable<number> {
    const formData = new FormData();
    formData.append('libro_id', libro_id.toString());
    return this.lector.post<number>(this.apiurl + 'eliminar', formData);
  }

  insertar(libro: ILibro): Observable<string> {
    const formData = new FormData();
    formData.append('titulo', libro.titulo);
    formData.append('autor_id', libro.autor_id.toString());
    formData.append('fecha_publicacion', libro.fecha_publicacion);
    formData.append('genero', libro.genero);
    formData.append('isbn', libro.isbn);
    return this.lector.post<string>(this.apiurl + 'insertar', formData);
  }

  actualizar(libro: ILibro): Observable<string> {
    const formData = new FormData();
    formData.append('libro_id', libro.libro_id.toString());
    formData.append('titulo', libro.titulo);
    formData.append('autor_id', libro.autor_id.toString());
    formData.append('fecha_publicacion', libro.fecha_publicacion);
    formData.append('genero', libro.genero);
    formData.append('isbn', libro.isbn);
    return this.lector.post<string>(this.apiurl + 'actualizar', formData);
  }
}
