import { RotasPage } from './app.po';

describe('rotas App', function() {
  let page: RotasPage;

  beforeEach(() => {
    page = new RotasPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
