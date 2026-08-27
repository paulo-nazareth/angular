import { ServicosPage } from './app.po';

describe('servicos App', function() {
  let page: ServicosPage;

  beforeEach(() => {
    page = new ServicosPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
