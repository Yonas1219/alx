javascript
Copy code
import { shallowMount } from '@vue/test-utils';
import Portfolio from '@/components/Portfolio.vue'; // Adjust the path to where your component is located
import { portfolio } from '@/assets/data';

describe('Portfolio.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Portfolio);
  });

  it('renders the correct markup', () => {
    expect(wrapper.html()).toContain('<h2 class="heading" id="portfolio"> My <span>Portfolio</span></h2>');
  });

  it('renders the correct number of projects', () => {
    const boxes = wrapper.findAll('.box');
    expect(boxes.length).toBe(portfolio.length);
  });

  it('renders project details correctly', () => {
    const boxes = wrapper.findAll('.box');
    boxes.wrappers.forEach((boxWrapper, index) => {
      const project = portfolio[index];
      expect(boxWrapper.find('h3').text()).toBe(project.title);
      expect(boxWrapper.find('span.highlight').text()).toBe(project.description);
      expect(boxWrapper.find('span.span').text()).toBe(project.techStack.toString());
      
      if (project.repo) {
        expect(boxWrapper.find('a[href="' + project.repo + '"]').exists()).toBe(true);
      }
      if (project.link) {
        expect(boxWrapper.find('a[href="' + project.link + '"]').exists()).toBe(true);
      }
    });
  });
});