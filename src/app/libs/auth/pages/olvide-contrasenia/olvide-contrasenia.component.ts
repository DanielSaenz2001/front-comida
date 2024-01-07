import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-olvide-contrasenia',
  templateUrl: './olvide-contrasenia.component.html',
  styleUrls: ['./olvide-contrasenia.component.scss']
})
export class OlvideContraseniaComponent implements OnInit {

  recuperarForm!: FormGroup;

  constructor(
    private loginService: LoginService
  ) { 
    this.initialComponent();
  }
  
  ngOnInit(): void {

  }

  private initialComponent(): void {
    this.recuperarForm = new FormGroup({
      email: new FormControl(null, Validators.required),
    });
  }

}
