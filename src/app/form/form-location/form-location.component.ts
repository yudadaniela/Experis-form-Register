import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  @Output() locationDataChange: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
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

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      pais: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {

    this.formulario.get('pais')?.valueChanges.subscribe((pais) => {
      this.estados[pais] = this.obtenerEstadosPorPais(pais);
      this.formulario.get('estado')?.setValue('');
      this.formulario.get('ciudad')?.setValue('');
    });

    this.formulario.get('estado')?.valueChanges.subscribe((estado) => {
      // this.estados = this.obtenerCiudadesPorEstado(estado)
      this.formulario.get('ciudad')?.setValue('');
    });

    const paisPredeterminado = this.paises[0];
    this.estados[paisPredeterminado] =
      this.obtenerEstadosPorPais(paisPredeterminado);
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

  emitLocationData() {
    this.locationDataChange.emit(this.formulario);
  }

}
