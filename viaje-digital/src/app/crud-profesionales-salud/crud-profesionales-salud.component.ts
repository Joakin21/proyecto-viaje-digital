import { Component, OnInit } from '@angular/core';
import { UserService } from '../servicios/user.service';
import { NgForm, FormGroup, FormControl } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-crud-profesionales-salud',
  templateUrl: './crud-profesionales-salud.component.html',
  styleUrls: ['./crud-profesionales-salud.component.css']
})
export class CrudProfesionalesSaludComponent implements OnInit {

  constructor(private userService: UserService) { }

  updateUserForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    profesion: new FormControl(''),
    centro_salud: new FormControl('')
  });

  myUsers: any[] = []
  show_error_create_user: boolean = false
  error_create_user: string = ""

  ngOnInit(): void {
    //Obtengo todos los usuarios
    this.userService.getAllUsers().subscribe(
      data => {
        this.myUsers = data
        //console.log(this.myUsers)
      },
      error => {
        console.log('error', error)
      }
    );
  }

  createUser(new_user: NgForm) {
    var valid_data = new_user.valid
    var form_user = new_user.value

    if (!valid_data) {
      this.error_create_user = "Error, you must fill all the fields with the required information"
      this.show_error_create_user = true
    }
    else if (form_user["password"] != form_user["password_rep"]) {
      this.error_create_user = "Error, passwords do not match"
      this.show_error_create_user = true
    }
    else {
      //preparamos los datos para crear nuevo usuario
      var my_new_user =
      {
        "user":
        {
          "username": form_user["username"],
          "password": form_user["password"],
          "first_name": form_user["first_name"],
          "last_name": form_user["last_name"]
        },
        "profesion": form_user["profesion"],
        "centro_salud": form_user["centro_salud"]
      }
      //llamamos funcion que crea nuevo usuario
      this.userService.createUser(my_new_user).subscribe(
        new_user => {
          if (new_user["detail"]) {
            this.error_create_user = new_user["detail"]
            this.show_error_create_user = true
          }
          else {
            this.show_error_create_user = false
            this.myUsers.push(new_user)
            $('#modalCreateUser').modal('toggle');

          }

        },
        error => {
          console.log('error', error)
        }
      );

    }

  }

  deleteUser(user_index) {
    var respuesta = confirm("Are you sure you want to delete this user?");
    if (respuesta) {
      var user_id = this.myUsers[user_index]["user"]["id"]
      this.userService.deleteUser(user_id).subscribe(
        data => {
          if (!data["detail"]) {//sin no hay un error inesperado
            console.log(data)
            this.myUsers.splice(user_index, 1)
          }

          //eliminar del array
        },
        error => {
          console.log('error', error)
        }
      );
    }

  }

  index_user_to_update: number
  prepareModalUpdateUser(user_index) {
    this.index_user_to_update = user_index
    //seteamos el form del modal update con los calores del usuario seleccionado
    this.updateUserForm.controls["username"].setValue(this.myUsers[user_index]["user"]["username"])
    this.updateUserForm.controls["first_name"].setValue(this.myUsers[user_index]["user"]["first_name"])
    this.updateUserForm.controls["last_name"].setValue(this.myUsers[user_index]["user"]["last_name"])
    this.updateUserForm.controls["profesion"].setValue(this.myUsers[user_index]["profesion"])
    this.updateUserForm.controls["centro_salud"].setValue(this.myUsers[user_index]["centro_salud"])
    //Abrimos el modal update 
    $('#modalUpdateUser').modal('show');
  }

  updateUser() {
    $('#modalUpdateUser').modal('toggle');

    var user_id = this.myUsers[this.index_user_to_update]["user"]["id"]
    var user_updated = {
      "user": {
      }
    }
    var updateUserForm = this.updateUserForm.value

    if (updateUserForm["username"]) {
      user_updated["user"]["username"] = updateUserForm["username"]
    }
    if (updateUserForm["password"]) {
      user_updated["user"]["password"] = updateUserForm["password"]
    }
    if (updateUserForm["first_name"]) {
      user_updated["user"]["first_name"] = updateUserForm["first_name"]
    }
    if (updateUserForm["last_name"]) {
      user_updated["user"]["last_name"] = updateUserForm["last_name"]
    }
    if (updateUserForm["profesion"]) {
      user_updated["profesion"] = updateUserForm["profesion"]
    }
    if (updateUserForm["centro_salud"]) {
      user_updated["centro_salud"] = updateUserForm["centro_salud"]
    }

    this.userService.updateUser(user_updated, user_id).subscribe(
      data => {
        //console.log(data)
        if (!data["detail"]) {//sin no hay un error inesperado
          this.myUsers[this.index_user_to_update] = data
        }
      },
      error => {
        console.log('error', error)
      }
    );
  }

  public trackItem(index: number) {
    return index;
  }

}
