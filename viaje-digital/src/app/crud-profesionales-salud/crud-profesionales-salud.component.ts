import { Component, OnInit } from '@angular/core';
import { UserService } from '../servicios/user.service';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-crud-profesionales-salud',
  templateUrl: './crud-profesionales-salud.component.html',
  styleUrls: ['./crud-profesionales-salud.component.css']
})
export class CrudProfesionalesSaludComponent implements OnInit {

  constructor(private userService: UserService, private formBuilder: FormBuilder) { }
  crearteUserForm: FormGroup
  updateUserForm: FormGroup

  myUsers: any[] = []
  show_error_create_user: boolean = true
  show_error_update_user: boolean = false
  error_create_user: string = ""

  index_user_to_update: number 

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

    this.crearteUserForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      repeat_password: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      profesion: ['', Validators.required],
      centro_salud: ['', Validators.required]
    })

    this.updateUserForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: [''],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      profesion: ['', Validators.required],
      centro_salud: ['', Validators.required]
    })

  }


  createUser() {
    console.log(this.crearteUserForm.value)
    let form_user = this.crearteUserForm.value
    
    //this.passwords_match = new_user['password'] == new_user['repeat_password'] 
    if (form_user["password"] != form_user["repeat_password"]) {
      this.error_create_user = "Error, passwords do not match"
      this.show_error_create_user = true
    }
  
    else {
      //preparamos los datos para crear nuevo usuario
      let my_new_user =
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

  prepareModalUpdateUser(user_index) {

    this.index_user_to_update = user_index
    //seteamos el form del modal update con los calores del usuario seleccionado
    this.updateUserForm.controls["username"].setValue(this.myUsers[user_index]["user"]["username"])
    this.crearteUserForm.controls["password"].setValue('')

    this.updateUserForm.controls["first_name"].setValue(this.myUsers[user_index]["user"]["first_name"])
    this.updateUserForm.controls["last_name"].setValue(this.myUsers[user_index]["user"]["last_name"])
    this.updateUserForm.controls["profesion"].setValue(this.myUsers[user_index]["profesion"])
    this.updateUserForm.controls["centro_salud"].setValue(this.myUsers[user_index]["centro_salud"])
    //Abrimos el modal update 
    $('#modalUpdateUser').modal('show');
  }

  updateUser() {
    //alert("AAAAAAAAAAAAAAAAAA!!!")
    console.log(this.updateUserForm.value)
    
    let updateUserForm = this.updateUserForm.value

    let user_updated = {
      "user": {
        "first_name":updateUserForm["first_name"],
        "last_name":updateUserForm["last_name"],        
      },
      "profesion":updateUserForm["profesion"],
      "centro_salud":updateUserForm["centro_salud"],
    }
    if(updateUserForm["password"] != ""){
      user_updated["user"]["password"] = updateUserForm["password"]
    }
    if(updateUserForm["username"] != this.myUsers[this.index_user_to_update]["user"]["username"]){
      user_updated["user"]["username"] = updateUserForm["username"]
    }
  
    let user_id = this.myUsers[this.index_user_to_update]["user"]["id"]
  
    this.userService.updateUser(user_updated, user_id).subscribe(
      data => {
        //console.log(data)
        if (!data["detail"]) {//sin no hay un error inesperado
          this.show_error_update_user = false
          this.myUsers[this.index_user_to_update] = data
          $('#modalUpdateUser').modal('toggle');
        }else{
          this.show_error_update_user = true
          //alert(data["detail"])
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
