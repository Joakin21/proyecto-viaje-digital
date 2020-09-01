import { Injectable } from '@angular/core';
//import * as jsPDF from 'jspdf'
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }
  fichaPacienteToPdf(patient_journey:any){
    var myContent = [
      {
        text: 'Medical History',
        style: 'title',
        margin: [ 0, 0, 0, 10 ]
      },
      {
        text: 'Patient Data:',
        style: 'sesionName',
        margin: [ 0, 0, 0, 10 ]
      },
      "Name: " + patient_journey['nombre'],
      "Id: " + patient_journey['rut'],
      "Birth: " + patient_journey['fecha_nacimiento'],
      "Address: " + patient_journey['direccion'],
      "City: " + patient_journey['ciudad'],
    ]
    
    for(let sesion_medica of patient_journey['sesiones_medica']){
      myContent.push({text: sesion_medica['nombre_sesion'] + ":", style: 'sesionName', margin: [ 0, 10, 0, 10 ]})
      myContent.push("Person attending: " + sesion_medica["nombre_profesional"])
      myContent.push("Profession: " + sesion_medica["profesion"])
      myContent.push("Clinic: " + sesion_medica["centro_salud"])

      for(let arquetipo of sesion_medica['arquetipos']){
        for(let nodo of arquetipo){
          if(nodo['tipo']==1){
            myContent.push({text: nodo['valor'] + ":", style: "archetypeTitle", margin: [ 0, 10, 0, 10 ]})
          }
          if(nodo['tipo']==2){
            myContent.push({text: nodo['valor'] + ":", style: "typeStructure", margin: [ 0, 0, 0, 0 ]})
          }
          if(nodo['tipo']==3){
            myContent.push({text: nodo['valor'] + ":", style: "typeClusterAndField", margin: [ 0, 0, 0, 0 ]})
          }
          if(nodo['tipo']==4){
            //nodo['clave'] + ": " + nodo['valor']
            myContent.push({text: nodo['clave'] + ":", style: "typeClusterAndField", margin: [ 0, 0, 0, 0 ]})
            myContent.push(nodo['valor'])
          }
        }
      }

    }

    const documentDefinition = { 
      content: myContent,

      styles: {
        title: {
          fontSize: 21,
          bold: true,
          alignment: 'center'
        },
        sesionName: {
          fontSize: 18,
          bold: true,
          color: 'blue'
        },
        archetypeTitle: {
          fontSize: 15,
          bold: true,
        },
        typeStructure: {
          bold: true,
          color: 'orange'
        },
        typeClusterAndField: {
          bold: true
        }
      }
    };
    pdfMake.createPdf(documentDefinition).open();
  }
  /*
  fichaPacienteToPdf(patient_journey:any){
    //console.log(patient_journey)
    var doc = new jsPDF();
    //title:
    doc.setFont("arial","bold");
    doc.setFontSize(22)
    doc.text(20, 20, 'Medical History');
    //Información del paciente:
    doc.setFont("arial","normal");
    doc.setFontSize(12)
    doc.text(20, 30, "Name: " + patient_journey['nombre'] + " " + patient_journey['apellidos'])
    doc.text(20, 35, "Id: " + patient_journey['rut'])
    doc.text(20, 40, "Birth: " + patient_journey['fecha_nacimiento'])
    doc.text(20, 45, "Address: " + patient_journey['direccion'])
    doc.text(20, 50, "City: " + patient_journey['ciudad'])
    //Recorrer sesiones:
    var y = 60
    for(let sesion_medica of patient_journey['sesiones_medica']){
      //nombre titulo de sesion
      doc.setFont("arial","bold")
      doc.setFontSize(16)
      doc.setTextColor(89, 176, 243)
      y = this.agregarText(20, y, sesion_medica['nombre_sesion'], doc)
      //doc.text(20, y, sesion_medica['nombre_sesion'])
      //Cabecera de la sesion
      doc.setFont("arial","normal");
      doc.setFontSize(12)
      doc.setTextColor(0, 0, 0)
      y = this.agregarText(20, y = y + 10, "Person attending: " + sesion_medica["nombre_profesional"], doc)
      y = this.agregarText(20, y = y + 5, "Profession: " + sesion_medica["profesion"], doc)
      y = this.agregarText(20, y = y + 5, "Clinic: " + sesion_medica["centro_salud"], doc)
      //Recorrer arquetipos de la sesion:
      for(let arquetipo of sesion_medica['arquetipos']){
        for(let nodo of arquetipo){
          if(nodo['tipo']==1){ //titulo arquetipo
            doc.setFont("arial","bold")
            doc.setFontSize(14)
            y = this.agregarText(20, y = y + 10, nodo['valor'], doc)
          }
          if(nodo['tipo']==2){
            doc.setFont("arial","bold")
            doc.setFontSize(12)
            y = this.agregarText(20, y = y + 10, nodo['valor'], doc)
            y = y + 5
          }
          if(nodo['tipo']==3){
            doc.setFont("arial","normal")
            doc.setFontSize(12)
            y = this.agregarText(20, y = y + 10, nodo['valor'], doc)
            y = y + 5
          }
          if(nodo['tipo']==4){
            doc.setFont("arial","normal")
            doc.setFontSize(12)
            var parrafo_nodo = nodo['clave'] + ": " + nodo['valor']
            //parrafo_nodo = parrafo_nodo.toString()
            var parrafo_nodo_len = parrafo_nodo.length
            var num_lineas_parrafo_nodo = Math.trunc(parrafo_nodo_len / 180) + 1 

            //var strArr = doc.splitTextToSize(parrafo_nodo, 180)
            y = y + 10
            //doc.text(20, y, strArr)
            y = this.agregarText(20, y, parrafo_nodo, doc, true)
            y = y + 5 * num_lineas_parrafo_nodo

          }

        }
      }


      y = y + 10

    }

    doc.output('dataurlnewwindow');
    //doc.save('hello-world.pdf');
  }*/
  
}
