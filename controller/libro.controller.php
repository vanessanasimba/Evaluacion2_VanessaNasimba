<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER["REQUEST_METHOD"];
if ($method == "OPTIONS") {
    die();
}

require_once('../models/libros_modelo.php');
error_reporting(0);
$libro = new Libros();

switch ($_GET["op"]) {
        //TODO: operaciones de clientes

    case 'todos': // Procedimiento para cargar todos los datos de los clientes
        $datos = array(); 
        $datos = $libro->todos(); 
        while ($row = mysqli_fetch_assoc($datos)){
            $todos[] = $row;
        }
        echo json_encode($todos);
        break;

    case 'uno': 
        if (!isset($_POST["libro_id"])) {
            echo json_encode(["error" => "libro ID not specified."]);
            exit();
        }
        $libro_id = intval($_POST["libro_id"]);
        $datos = array();
        $datos = $libro->uno($libro_id);
        $res = mysqli_fetch_assoc($datos);
        echo json_encode($res);
        break;

    case 'insertar': // Procedimiento para insertar un cliente en la base de datos
        if (!isset($_POST["titulo"]) || !isset($_POST["isbn"]) || !isset($_POST["genero"]) || !isset($_POST["fecha_publicacion"]) || !isset($_POST["autor_id"])) {
            echo json_encode(["error" => "Missing required parameters."]);
            exit();
        }

        $titulo = $_POST["titulo"]; 
        $isbn = $_POST["isbn"];
        $genero = $_POST["genero"];
        $fecha_publicacion = $_POST["fecha_publicacion"];
        $autor_id = $_POST["autor_id"];
        $datos = array();
        $datos = $libro->insertar($titulo, $isbn, $genero, $fecha_publicacion,$autor_id);
        echo json_encode($datos);
        break;

    case 'actualizar': // Procedimiento para actualizar un cliente en la base de datos
        if (!isset($_POST["libro_id"]) || !isset($_POST["titulo"]) || !isset($_POST["isbn"]) || !isset($_POST["genero"]) || !isset($_POST["fecha_publicacion"]) || !isset($_POST["autor_id"])) {
            echo json_encode(["error" => "Missing required parameters."]);
            exit();
        }

        $libro_id = intval($_POST["libro_id"]);
        $titulo = $_POST["titulo"]; 
        $isbn = $_POST["isbn"];
        $genero = $_POST["genero"];
        $fecha_publicacion = $_POST["fecha_publicacion"];
        $autor_id = intval($_POST["autor_id"]);


        $datos = array();
        $datos = $libro->actualizar($libro_id, $titulo, $isbn, $genero, $fecha_publicacion,$autor_id);
        echo json_encode($datos);
        break;

    case 'eliminar': // Procedimiento para eliminar un cliente en la base de datos
        if (!isset($_POST["libro_id"])) {
            echo json_encode(["error" => "Autor ID not specified."]);
            exit();
        }
        $libro_id = intval($_POST["libro_id"]);
        $datos = array();
        $datos = $libro->eliminar($libro_id);
        echo json_encode($datos);
        break;

    default:
        echo json_encode(["error" => "Invalid operation."]);
        break;
}