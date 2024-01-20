import {ChangeDetectionStrategy, Component, computed, inject, OnInit, Signal} from '@angular/core';
import {RouterLink} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserStore} from "../../../../store/user.store";
import {NgClass} from "@angular/common";

interface LoginForm {
  username: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  private readonly userStore: UserStore = inject(UserStore);
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  public form: FormGroup<LoginForm>;
  public loading: Signal<boolean> = computed(() => this.userStore.loading())

  public ngOnInit(): void {
    this.buildForm();
  }

  public buildForm(): void {
    this.form = this.formBuilder.group<LoginForm>({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    })
  }

  public loginHandler(): void {
    const { username, password } = this.form.getRawValue();
    this.userStore.login( username, password )
  }
}
