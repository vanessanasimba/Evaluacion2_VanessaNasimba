<?php 
//TODO: model 
require_once('../config/config.php');
error_reporting(0);
class Autor{
    public function todos() 
    {
        $con = new ClaseConectar();
        $con = $con->conectarBaseDatos();
        $cadena = "SELECT * FROM `autor`";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function uno($autor_id) 
    {
        $con = new ClaseConectar();
        $con = $con->conectarBaseDatos();
        $cadena = "SELECT * FROM `autor` WHERE `autor_id`=$autor_id";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function insertar($nombre, $apellido, $fecha_nacimiento, $nacionalidad) 
    {
        try {
            $con = new ClaseConectar();
            $con = $con->conectarBaseDatos();
            $cadena = "INSERT INTO `autor`( `nombre`, `apellido`, `fecha_nacimiento`, `nacionalidad`) 
                       VALUES ('$nombre','$apellido','$fecha_nacimiento','$nacionalidad')";
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
    public function actualizar($autor_id, $nombre, $apellido, $fecha_nacimiento, $nacionalidad) 
    {
        try {
            $con = new ClaseConectar();
            $con = $con->conectarBaseDatos();
            $cadena = "UPDATE `autor`
                        SET
                        `nombre` = '$nombre',
                        `apellido` = '$apellido',
                        `fecha_nacimiento` = '$fecha_nacimiento',
                        `nacionalidad` = '$nacionalidad'
                        WHERE `autor_id` = $autor_id";
            if (mysqli_query($con, $cadena)) {
                return $autor_id;
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }
    public function eliminar($autor_id) //delete from clientes where id = $id
    {
        try {
            $con = new ClaseConectar();
            $con = $con->conectarBaseDatos();
            $cadena = "DELETE FROM `autor` WHERE `autor_id`= $autor_id";
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