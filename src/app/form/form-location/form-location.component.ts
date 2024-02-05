
import { Component, EventEmitter, OnInit, Output, ChangeDetectorRef } from '@angular/core';

import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
 
} from '@angular/forms';

@Component({
  selector: 'app-form-location',
  templateUrl: './form-location.component.html',
  styleUrls: ['./form-location.component.css']
})
export class FormLocationComponent implements OnInit {

  @Output() locationDataChange: EventEmitter<any> = new EventEmitter<any>();
  //@Output() locationData = new EventEmitter<any>();


  formulario: FormGroup;

  paises: string[] = ['Colombia', 'Chile', 'Brasil'];

  estados: Record<string, string[]> = {
    'Colombia': ['Cundinamarca', 'Antioquia'],
    'Chile': ['Santiago', 'Valparaiso'],
    'Brasil': ['São Paulo', 'Rio de Janeiro'],
  };

  ciudades: Record<string, Record<string, string[]>> = {
    'Colombia': {
      'Cundinamarca': ['Bogotá', 'Soacha', 'Chía', 'Funza'],
      'Antioquia': ['Medellin', 'Rio Negro', 'Bello'],
    },
    'Chile': {
      'Santiago': [
        'Santiago Centro',
        'Providencia',
        'Las Condes',
        'Ñuñoa',
        'La Florida',
      ],
      'Valparaiso': ['Viña del Mar', 'Quilpué', 'Concón', 'Quillota'],
    },
    'Brasil': {
      'São Paulo': [
        'São Paulo Centro',
        'Guarulhos',
        'Santo André',
        'São Bernardo',
        'Osasco',
      ],
      'Rio de Janeiro': [
        'Rio de Janeiro Centro',
        'Niterói',
        'São Gonçalo',
        'Duque de Caxias',
        'Nova Iguaçu',
      ],
    },
  };

  pasoActual: number = 1;

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {
    this.formulario = this.fb.group({
      pais: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    // Obtener valores predeterminados
    const paisPredeterminado = '';
    const estadoPredeterminado = '';
    const ciudadPredeterminada = '';

    // Inicializar el formulario con los valores predeterminados
    this.formulario = this.fb.group({
      pais: [paisPredeterminado, [Validators.required]],
      estado: [estadoPredeterminado, [Validators.required]],
      ciudad: [ciudadPredeterminada, [Validators.required]],
    });

    console.log('Formulario inicial:', this.formulario.value);

    // Suscripciones a cambios
    this.formulario.valueChanges.subscribe(() => {
      this.emitLocationData();
    });

    this.formulario.get('pais')?.valueChanges.subscribe((pais) => {
      console.log('Cambios en pais:', pais);
      this.estados[pais] = this.obtenerEstadosPorPais(pais);
      this.formulario.get('estado')?.setValue('');
      this.formulario.get('ciudad')?.setValue('');

    });

    this.formulario.get('estado')?.valueChanges.subscribe((estado) => {
      console.log('Cambios en estado:', estado);
      this.formulario.get('ciudad')?.setValue('');
    });

  }

  obtenerEstadosPorPais(pais: string): string[] {
    return this.estados[pais] || [];
  }

  obtenerCiudadesPorEstado() {
    const paisSeleccionado = this.formulario.value.pais;
    const estadoSeleccionado = this.formulario.value.estado;

    return this.ciudades[paisSeleccionado]?.[estadoSeleccionado] || [];
  }


  avanzar() {
    if(this.pasoActual < 3){
      this.pasoActual ++
    }
  }

  retroceder() {
    if(this.pasoActual > 1){
      this.pasoActual --
    }
  }


  // emitLocationData() {
  //   console.log('Emitiendo evento locationDataChange:', this.formulario.value.locationInfo);
  //   setTimeout(() => {
  //     this.locationDataChange.emit(this.formulario);
  //   }, 0);
  // }

  emitLocationData() {
    const locationInfo = {
      pais: this.formulario.value.pais,
      estado: this.formulario.value.estado,
      ciudad: this.formulario.value.ciudad,
    };

    console.log('Datos de ubicación a emitir:', locationInfo);
    this.locationDataChange.emit(locationInfo);
  }

}
