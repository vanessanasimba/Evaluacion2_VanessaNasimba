import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAutor } from '../Interfaces/iautor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutorService {

  apiurl = 'http://localhost:8080/Vanessa_Nasimba_Evaluacion2/controller/autor.controlle.php?op=';

  constructor(private lector: HttpClient) { }

  todos(): Observable<IAutor[]> {
    return this.lector.get<IAutor[]>(this.apiurl + 'todos');
  }

  uno(autor_id: number): Observable<IAutor> {
    const formData = new FormData();
    formData.append('autor_id', autor_id.toString());
    return this.lector.post<IAutor>(this.apiurl + 'uno', formData);
  }

  eliminar(autor_id: number): Observable<number> {
    const formData = new FormData();
    formData.append('autor_id', autor_id.toString());
    return this.lector.post<number>(this.apiurl + 'eliminar', formData);
  }

  insertar(autor: IAutor): Observable<string> {
    const formData = new FormData();
    formData.append('nombre', autor.nombre);
    formData.append('apellido', autor.apellido);
    formData.append('fecha_nacimiento', autor.fecha_nacimiento);
    formData.append('nacionalidad', autor.nacionalidad);
    return this.lector.post<string>(this.apiurl + 'insertar', formData);
  }

  actualizar(autor: IAutor): Observable<string> {
    const formData = new FormData();
    formData.append('autor_id', autor.autor_id.toString());
    formData.append('nombre', autor.nombre);
    formData.append('apellido', autor.apellido);
    formData.append('fecha_nacimiento', autor.fecha_nacimiento);
    formData.append('nacionalidad', autor.nacionalidad);
    return this.lector.post<string>(this.apiurl + 'actualizar', formData);
  }


}
