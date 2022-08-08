import { Test } from '@nestjs/testing';
import { MjmlService } from '../mjml.service';

describe('MjmlService', () => {
  let mjmlService: MjmlService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [MjmlService],
    }).compile();

    mjmlService = moduleRef.get<MjmlService>(MjmlService);
  });

  describe('transform', () => {
    it('should transform mjml to html', async () => {
      // Arrange
      const template = `<mjml>
      <mj-head>
        <mj-title>Say hello to card</mj-title>
      </mj-head>
      <mj-body background-color="#F2F2F2">
      </mj-body>
    </mjml>`;

      // Act
      const html = await mjmlService.transform(template);

      // Assert
      expect(html.length).toBe(1524);
      expect(html).toContain('<!doctype html>');
      expect(html).toContain('</html>');
    });
  });

  describe('validate', () => {
    it('should return errors in invalid mjml', async () => {
      // Arrange
      const template = `<mjml></mjml>`;

      // Act
      const html = await mjmlService.validate(template);

      // Assert
      expect(html).toStrictEqual([
        {
          formattedMessage:
            'Malformed MJML. Check that your structure is correct and enclosed in <mjml> tags.',
          line: 0,
          message:
            'Malformed MJML. Check that your structure is correct and enclosed in <mjml> tags.',
          tagName: 'n/a',
        },
      ]);
    });

    it('should return empty array on valid mjml', async () => {
      // Arrange
      const template = `<mjml><mj-body></mj-body></mjml>`;

      // Act
      const html = await mjmlService.validate(template);

      // Assert
      expect(html).toStrictEqual([]);
    });
  });
});
