import { ComponentFixture, TestBed } from "@angular/core/testing";

import { MButton } from "./mbutton";

describe("MButton", () => {
  let component: MButton;
  let fixture: ComponentFixture<MButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MButton],
    }).compileComponents();

    fixture = TestBed.createComponent(MButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
