<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER["REQUEST_METHOD"];
if ($method == "OPTIONS") {
    die();
}

//TODO: controlador de clientes Tienda Cel@g

require_once('../models/autor_model.php');
error_reporting(0);
$autor = new Autor();

switch ($_GET["op"]) {
        //TODO: operaciones de clientes

    case 'todos': // Procedimiento para cargar todos los datos de los clientes
        $datos = array();
        $datos = $autor->todos();
        while ($row = mysqli_fetch_assoc($datos)) {
            $todos[] = $row;
        }
        echo json_encode($todos);
        break;

    case 'uno': // Procedimiento para obtener un registro de la base de datos
        if (!isset($_POST["autor_id"])) {
            echo json_encode(["error" => "autori ID not specified."]);
            exit();
        }
        $autor_id = intval($_POST["autor_id"]);
        $datos = array();
        $datos = $autor->uno($autor_id);
        $res = mysqli_fetch_assoc($datos);
        echo json_encode($res);
        break;

    case 'insertar': // Procedimiento para insertar un cliente en la base de datos
        if (!isset($_POST["nombre"]) || !isset($_POST["apellido"]) || !isset($_POST["fecha_nacimiento"]) || !isset($_POST["nacionalidad"])) {
            echo json_encode(["error" => "Missing required parameters."]);
            exit();
        }
        $nombre = $_POST["nombre"];
        $apellido = $_POST["apellido"];
        $fecha_nacimiento = $_POST["fecha_nacimiento"];
        $nacionalidad = $_POST["nacionalidad"];
        $datos = array();
        $datos = $autor->insertar($nombre, $apellido, $fecha_nacimiento, $nacionalidad);
        echo json_encode($datos);
        break;

    case 'actualizar': // Procedimiento para actualizar un cliente en la base de datos
        if (!isset($_POST["autor_id"]) || !isset($_POST["nombre"]) || !isset($_POST["apellido"]) || !isset($_POST["fecha_nacimiento"]) || !isset($_POST["nacionalidad"])) {
            echo json_encode(["error" => "Missing required parameters."]);
            exit();
        }

        $autor_id = intval($_POST["autor_id"]);
        $nombre = $_POST["nombre"];
        $apellido = $_POST["apellido"];
        $fecha_nacimiento = $_POST["fecha_nacimiento"];
        $nacionalidad = $_POST["nacionalidad"];


        $datos = array();
        $datos = $autor->actualizar($autor_id, $nombre, $apellido, $fecha_nacimiento, $nacionalidad);
        echo json_encode($datos);
        break;

    case 'eliminar': // Procedimiento para eliminar un cliente en la base de datos
        if (!isset($_POST["autor_id"])) {
            echo json_encode(["error" => "Autor ID not specified."]);
            exit();
        }
        $autor_id = intval($_POST["autor_id"]);
        $datos = array();
        $datos = $autor->eliminar($autor_id);
        echo json_encode($datos);
        break;

    default:
        echo json_encode(["error" => "Invalid operation."]);
        break;
}