import {ChangeDetectionStrategy, Component, computed, inject, Signal} from '@angular/core';
import {RouterLink} from "@angular/router";
import {UserStore} from "../../store/user.store";
import {User} from "../../models/user";
import {NgTemplateOutlet} from "@angular/common";

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [
    RouterLink,
    NgTemplateOutlet
  ],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopBarComponent {
  private readonly userStore: UserStore = inject(UserStore);

  public readonly user: Signal<User> = computed(() => this.userStore.user());
  public readonly loading: Signal<boolean> = computed(() => this.userStore.loading());

  public logOutHandler(): void {
    this.userStore.logOut();
  }
}
