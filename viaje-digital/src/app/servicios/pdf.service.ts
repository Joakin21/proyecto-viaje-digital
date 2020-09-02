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
  
}
