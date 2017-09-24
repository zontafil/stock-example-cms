import { StockCmsPage } from './app.po';

describe('stock-cms App', () => {
  let page: StockCmsPage;

  beforeEach(() => {
    page = new StockCmsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
