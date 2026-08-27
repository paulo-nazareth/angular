import { ProjetoInicialPage } from './app.po';

describe('projeto-inicial App', () => {
  let page: ProjetoInicialPage;

  beforeEach(() => {
    page = new ProjetoInicialPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
