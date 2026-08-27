import { ProjetoLibsExternasPage } from './app.po';

describe('projeto-libs-externas App', () => {
  let page: ProjetoLibsExternasPage;

  beforeEach(() => {
    page = new ProjetoLibsExternasPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
