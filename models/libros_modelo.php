<?php 
//TODO: model 
require_once('../config/config.php');
error_reporting(0);
class Libros{
    public function todos() 
    {
        $con = new ClaseConectar();
        $con = $con->conectarBaseDatos();
        $cadena = "SELECT * FROM `libros`";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function uno($libro_id) 
    {
        $con = new ClaseConectar();
        $con = $con->conectarBaseDatos();
        $cadena = "SELECT * FROM `libros` WHERE `libro_id`=$libro_id";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function insertar($titulo, $isbn, $genero, $fecha_publicacion, $autor_id) 
    {
        try {
            $con = new ClaseConectar();
            $con = $con->conectarBaseDatos();
            $cadena = "INSERT INTO `libros`(`titulo`,`isbn`,`genero`,`fecha_publicacion`,`autor_id`)
                       VALUES ('$titulo','$isbn','$genero','$fecha_publicacion',$autor_id)";
            if (mysqli_query($con, $cadena)) {
                return $con->insert_id;
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }
    public function actualizar($libro_id, $titulo, $isbn, $genero, $fecha_publicacion, $autor_id) 
    {
        try {
            $con = new ClaseConectar();
            $con = $con->conectarBaseDatos();
            $cadena = "UPDATE `libros`
                        SET
                        `titulo` = '$titulo',
                        `isbn` = '$isbn',
                        `genero` = '$genero',
                        `fecha_publicacion` = '$fecha_publicacion',
                        `autor_id` = $autor_id
                        WHERE `libro_id` = $libro_id";
            if (mysqli_query($con, $cadena)) {
                return $libro_id;
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }
    public function eliminar($libro_id) //delete from clientes where id = $id
    {
        try {
            $con = new ClaseConectar();
            $con = $con->conectarBaseDatos();
            $cadena = "DELETE FROM `libros` WHERE `libro_id`= $libro_id";
            if (mysqli_query($con, $cadena)) {
                return 1;
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }


}

?>