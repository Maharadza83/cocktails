import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {TopBarComponent} from "./shared/top-bar/top-bar.component";
import {UserStore} from "./store/user.store";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TopBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  private readonly userStore: UserStore = inject(UserStore)

  public ngOnInit(): void {
    this.fetchUser()
  }

  private fetchUser(): void {
    this.userStore.getSelf();
  }
}
