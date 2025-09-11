'use server';

/**
 * @fileOverview Implements intelligent search for tickets and customer profiles using keywords and natural language.
 *
 * - intelligentSearch - A function that performs the intelligent search.
 * - IntelligentSearchInput - The input type for the intelligentSearch function.
 * - IntelligentSearchOutput - The return type for the intelligentSearch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IntelligentSearchInputSchema = z.object({
  query: z.string().describe('The search query from the support agent.'),
});
export type IntelligentSearchInput = z.infer<typeof IntelligentSearchInputSchema>;

const IntelligentSearchOutputSchema = z.object({
  results: z.array(
    z.object({
      type: z.enum(['ticket', 'customer_profile']).describe('The type of search result.'),
      id: z.string().describe('The ID of the ticket or customer profile.'),
      title: z.string().describe('The title or summary of the result.'),
      content: z.string().describe('A snippet of the content from the result.'),
      relevanceScore: z.number().describe('A score indicating the relevance of the result to the query.'),
    })
  ).describe('The search results.'),
});
export type IntelligentSearchOutput = z.infer<typeof IntelligentSearchOutputSchema>;

export async function intelligentSearch(input: IntelligentSearchInput): Promise<IntelligentSearchOutput> {
  return intelligentSearchFlow(input);
}

const intelligentSearchPrompt = ai.definePrompt({
  name: 'intelligentSearchPrompt',
  input: {schema: IntelligentSearchInputSchema},
  output: {schema: IntelligentSearchOutputSchema},
  prompt: `You are a search assistant for a customer support system. Your job is to take a search query and return relevant results from tickets and customer profiles.

Given the following search query:

{{query}}

Return a JSON array of search results. Each result should include the type (ticket or customer_profile), the ID, a title or summary, a snippet of the content, and a relevance score between 0 and 1.

Make sure the relevanceScore field is populated appropriately.`,
});

const intelligentSearchFlow = ai.defineFlow(
  {
    name: 'intelligentSearchFlow',
    inputSchema: IntelligentSearchInputSchema,
    outputSchema: IntelligentSearchOutputSchema,
  },
  async input => {
    const {output} = await intelligentSearchPrompt(input);
    return output!;
  }
);
