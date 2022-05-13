import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const submitFeedback = new SubmitFeedbackUseCase(
    { create: async () => {} },
    { sendMail: async () => {} }
);

describe('Submit Feedback', () => {
    it('should be able to submit a feedback', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'exemplo um',
            screenshot: 'data:image/png;base64,sfankfbsalkbfasljkbflsa',
        })).resolves.not.toThrow();
    });

    it('should not be able to submit a feedback with a invalid screenshot format', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'exemplo dois',
            screenshot: 'teste.png',
        })).rejects.toThrow();
    });

    it('should not be able to submit a feedback without type', async () => {
        await expect(submitFeedback.execute({
            type: '',
            comment: 'exemplo tres',
            screenshot: 'data:image/png;base64,sfankfbsalkbfasljkbflsa',
        })).rejects.toThrow();
    });
    it('should not be able to submit a feedback without comment', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64,sfankfbsalkbfasljkbflsa',
        })).rejects.toThrow();
    });
});