import {ChangeDetectionStrategy, Component, computed, inject, OnInit, Signal} from '@angular/core';
import {RouterLink} from "@angular/router";
import {UserStore} from "../../../../store/user.store";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass} from "@angular/common";

interface RegisterForm {
  username: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit {
  private readonly userStore: UserStore = inject(UserStore);
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  public form: FormGroup<RegisterForm>;
  public loading: Signal<boolean> = computed(() => this.userStore.loading())

  public ngOnInit(): void {
    this.buildForm();
  }

  public buildForm(): void {
    this.form = this.formBuilder.group<RegisterForm>({
      username: new FormControl('', [Validators.required, Validators.maxLength(32), Validators.minLength(6)]),
      email: new FormControl('', [Validators.email, Validators.maxLength(128)]),
      password: new FormControl('', [Validators.maxLength(128), Validators.minLength(8), Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$')]),
    })
  }

  public registerHandler(): void {
    if (this.form.valid) {
      const { username, email, password } = this.form.getRawValue();
      this.userStore.register( username, email, password )
    }
  }
}
