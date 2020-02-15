
export class UserProgram {
  public id: number;
  public idx: number;
  public pg: string;
  public node: string;
  public type: string;
  public icon: string;
  public modulePath: string;
}

export class ProgramCatalog {
  public catogory: string;
  public id: number;
  public idx: number;
  public icon: string;
  public program: UserProgram[];

  constructor() {
    this.program = new Array<UserProgram>();
  }
}

export class ProgramModule {
  public id: number;
  public moduleId: number;
  public moduleName: string;
  public node: string;
  public icon: string;
  public modulePath: string ;
  public function: ProgramCatalog[];

  constructor() {
    this.function = new Array<ProgramCatalog>();
  }
}

export class UserMenu {
  public menu: ProgramModule[];
  public system: string;
  public userId: string;

  constructor() {
    this.menu = new Array<ProgramModule>();
  }
}
