export type Competency = {
  id: string
  label: string
  detail?: string
  critical?: boolean
}

export type KnowledgeQuestion = {
  id: string
  prompt: string
  answer: string
}

export const floorCompetencies: Competency[] = [
  { id: 'floor-map', label: 'Draws or describes the floor plan and table numbering accurately.' },
  { id: 'floor-five', label: 'Locates five table numbers called out at random without hesitation.' },
  { id: 'floor-section', label: 'Identifies their assigned section and explains how they will monitor it as one service area.' },
  { id: 'floor-flow', label: 'Identifies server stations, POS terminals, washrooms, exits, highchairs and key service routes.' },
]

export const greetingCompetencies: Competency[] = [
  { id: 'greet-promptly', label: 'Greets guests warmly and promptly, introduces themself and provides the drinks menu.' },
  { id: 'greet-first-visit', label: 'Asks whether this is the guest’s first visit and adjusts the menu introduction appropriately.' },
  { id: 'greet-features', label: 'Explains current features and offers a genuine recommendation.' },
  { id: 'greet-water', label: 'Takes the beverage order, then offers sparkling or still water.' },
  { id: 'greet-settings', label: 'Removes extra place settings and unneeded menus to keep the table comfortable.' },
  { id: 'greet-seating', label: 'Seats the party thoughtfully and knows when to ask a manager for help with reservations or table moves.' },
]

export const allergyCompetencies: Competency[] = [
  { id: 'allergy-clarify', label: 'Clarifies whether the request is an allergy, intolerance or preference.', critical: true },
  { id: 'allergy-never-promise', label: 'Does not promise an allergen-free or celiac-safe meal; explains that wheat, dairy, egg, fish and pork are handled in the kitchen.', critical: true },
  { id: 'allergy-pos', label: 'Enters the allergy clearly in the POS and communicates it directly to the kitchen and manager.', critical: true },
  { id: 'allergy-confirm', label: 'Confirms ingredients and preparation before recommending or serving an item.', critical: true },
  { id: 'allergy-dietary', label: 'Correctly explains Vegan, Vegetarian, Gluten-free available and Dairy-free options.' },
  { id: 'allergy-modifiers', label: 'Repeats modifiers back to the guest and verifies the printed kitchen ticket.' },
]

export const posCompetencies: Competency[] = [
  { id: 'pos-seats', label: 'Uses the correct table number, guest count and seat positions.' },
  { id: 'pos-drinks-first', label: 'Enters drinks before taking them to the table.' },
  { id: 'pos-course', label: 'Courses starters and mains correctly and confirms whether guests want starters first.' },
  { id: 'pos-modifiers', label: 'Uses the correct menu item, size, add-on, removal and allergy modifiers.', critical: true },
  { id: 'pos-review', label: 'Reviews the order before sending and confirms the kitchen received the intended ticket.', critical: true },
  { id: 'pos-payment', label: 'Can split a cheque, move an item correctly and process cash/card payment under supervision.' },
]

export const runningCompetencies: Competency[] = [
  { id: 'run-hands', label: 'Uses trays and carries plates safely; works with full hands in and out.' },
  { id: 'run-auction', label: 'Uses seat positions and does not auction food or drinks.' },
  { id: 'run-drinks', label: 'Serves soft drinks with an ice glass and pours beer/pop at the table.' },
  { id: 'run-wine', label: 'Presents wine, offers the host a taste, serves guests clockwise with host last, and uses a chiller for white wine.' },
  { id: 'run-condiments', label: 'Offers the right accompaniments: pepper, chilli oil or flakes, side plates and sharing plates.' },
  { id: 'run-checkback', label: 'Checks back within 90 seconds or the first two bites, then visually checks again around three-quarters finished.' },
  { id: 'run-clear', label: 'Clears efficiently after everyone is finished and avoids interrupting the table.' },
]

export const foodQuestions: KnowledgeQuestion[] = [
  { id: 'food-rocket', prompt: 'Name every ingredient on the Rocket pizza.', answer: 'Niagara prosciutto, arugula, parmesan, fior di latte and tomato sauce.' },
  { id: 'food-stuffed', prompt: 'Which pizza has ricotta inside the crust, and what else is on it?', answer: 'The Toonie: basil pesto, chicken, wild mushrooms and fior di latte in a ricotta-stuffed crust.' },
  { id: 'food-vancouver', prompt: 'What makes the Vancouver fully vegan?', answer: 'Vegan black truffle cheese, vegan mozzarella, eggplant, spicy maple syrup and potato slices; the current menu marks it Vegan.' },
  { id: 'food-superman', prompt: 'Which pizza is connected to a Canadian comic-book legend?', answer: 'Superman, named for Torontonian co-creator Joe Shuster.' },
  { id: 'food-longbranch', prompt: 'Name every topping on the Long Branch pizza.', answer: 'Spinach, eggplant, sun-dried tomatoes, kalamata olives, goat cheese, fior di latte and tomato sauce.' },
  { id: 'food-grandriver', prompt: 'Name every meat on the Grand River pizza.', answer: 'Spicy Calabrese salami, ham, wild boar sausage, pork pepperoni and crispy prosciutto.' },
  { id: 'food-calzone', prompt: 'What is inside the Calzone, and how is it served?', answer: 'Ham, wild mushrooms, ricotta and fior di latte, with tomato sauce on the side.' },
  { id: 'food-501', prompt: 'Describe the 501 pizza: base, meats, cheeses and finish.', answer: 'Spicy Calabrese salami, smoked provolone, creamy stracciatella and olive dust on roasted-pepper tomato sauce.' },
  { id: 'food-pasta', prompt: 'Name the five regular pasta dishes on the current menu.', answer: 'Penne alla Vodka; Ravioli con Crema di Spinaci; Pasta Di Polpette; Pappardelle Di Funghi; Spaghetti al Pesto di Rucola.' },
  { id: 'food-penne', prompt: 'What add-ons can be offered with Penne alla Vodka?', answer: 'Chicken or crispy prosciutto, currently listed at $4.25.' },
  { id: 'food-warm-salad', prompt: 'Describe the Warm Chicken Salad, including its dressing.', answer: 'Mixed leaf and arugula, avocado, toasted seeds, shredded carrot, cherry tomatoes and warm pesto chicken with balsamic vinaigrette.' },
  { id: 'food-goat-salad', prompt: 'Which salad contains goat cheese and candied seeds, and what dressing is used?', answer: 'Goat Cheese Salad; goat cheese, cranberries and candied seeds on mixed leaves with red wine and thyme vinaigrette.' },
  { id: 'food-rapini', prompt: 'What are the two versions of Rapini & Polenta?', answer: 'Charred rapini and quinoa polenta in hot bomba sauce, with either wild mushrooms (vegan) or wild boar sausage.' },
  { id: 'food-gf', prompt: 'What must you tell a guest who asks whether gluten-free pizza is celiac-safe?', answer: 'A gluten-free crust is available, but wheat flour is handled in-house, so the restaurant cannot promise a fully celiac-safe or allergen-free environment. Confirm the allergy and preparation.' },
]

export const drinkQuestions: KnowledgeQuestion[] = [
  { id: 'drink-pinot', prompt: 'Name and describe the current Pinot Grigio in under ten words.', answer: 'Cantina Kurtatsch 2024: green apple, citrus and clean mineral finish. ABV 13.0%. The August menu describes it as crisp.' },
  { id: 'drink-prosecco', prompt: 'What flavours and finish should a guest expect from Piccini Prosecco?', answer: 'Pear, peach and soft bubbles, with a touch of sweetness. ABV 11.0%.' },
  { id: 'drink-sauv', prompt: 'Which white wine has a flinty mineral finish?', answer: 'Domaine Fleuriet l’Eclat Sauvignon Blanc: citrus, green apple and a flinty mineral finish.' },
  { id: 'drink-rose', prompt: 'Describe Margo Rosé from Two Sisters.', answer: 'Fresh strawberry and citrus with a crisp, dry finish. ABV 13.5%.' },
  { id: 'drink-malbec', prompt: 'What is the ABV and taste profile of Finca Martha Malbec?', answer: '13.0% ABV; ripe plum, blackberry and a soft cocoa finish.' },
  { id: 'drink-glass-red', prompt: 'A guest wants a structured red with cassis and cedar. What could you recommend?', answer: 'Eleventh Post Two Sisters 2020 is the direct match; the Cabernet Sauvignon 2020 Two Sisters also has cassis and cedar. Confirm by-the-glass availability before promising.' },
  { id: 'drink-house-beer', prompt: 'Who makes Shoreline Light Lager and FireStone IPA, and what are their ABVs?', answer: 'Something in the Water Brewery. Shoreline Light Lager is 4.0%; FireStone IPA is 4.9%.' },
  { id: 'drink-na', prompt: 'Which beer is non-alcoholic, and who makes it?', answer: 'Gooder NA IPA, made by Elora Brewing Company; 0.0% ABV.' },
  { id: 'drink-cider', prompt: 'Name the cider and its producer.', answer: 'Local Press Cider, Collective Arts Brewing Company; 4.5% ABV.' },
  { id: 'drink-negroni', prompt: 'What goes into the Negroni, and what serving size is listed?', answer: 'Gin, Campari, sweet red vermouth and an orange slice; listed as 3 oz.' },
  { id: 'drink-spritz', prompt: 'Name the three 5 oz Spritzes and their principal liqueur or aperitif.', answer: 'Aperol Spritz — Aperol; Hugo Spritz — St-Germain; Limoncello Spritz — limoncello. Each also includes Prosecco and soda water and is listed as 5 oz.' },
  { id: 'drink-margarita', prompt: 'What does the August menu list for the Mango & Lime Margarita?', answer: 'The menu lists it as made with rum, pineapple and passion juice; 6% ABV, 355 ml, $10.95.' },
  { id: 'drink-paloma', prompt: 'Describe the Lychee Paloma, including its size and ABV.', answer: 'Grapefruit and zesty lime in an agave cocktail; 6% ABV, 355 ml, $10.95.' },
  { id: 'drink-old-fashioned', prompt: 'What goes into the Old Fashioned, and what serving size is listed?', answer: 'Whiskey, bitters and sugar with orange zest; listed as 2 oz.' },
]

export const verbalScenarios: Competency[] = [
  { id: 'verbal-first-visit', label: 'Give a 30-second menu introduction to a first-time guest.' },
  { id: 'verbal-recommend', label: 'Recommend one starter, one pizza or pasta, and one beverage; explain why they work together.' },
  { id: 'verbal-dairy', label: 'A guest says, “I’m dairy-free.” Explain the questions you ask and three safe starting points without making a guarantee.', critical: true },
  { id: 'verbal-delay', label: 'A table has waited too long for mains. Show how you acknowledge the problem, communicate and involve a manager.' },
  { id: 'verbal-wine', label: 'Talk a guest through one crisp white, one fuller red and one non-alcoholic option.' },
]

export const mockOrders: Competency[] = [
  { id: 'mock-one', label: 'Two guests: Aperol Spritz and Gooder NA IPA; Antipasto to share; Long Branch on gluten-free crust; Penne alla Vodka with chicken. Course correctly and use seat positions.' },
  { id: 'mock-two', label: 'A guest reports a serious dairy allergy and asks for Vegan Meatballs and a Vancouver pizza. Demonstrate allergy clarification, POS entry, kitchen communication and read-back.', critical: true },
  { id: 'mock-three', label: 'Four guests share Rapini & Polenta with wild boar. Enter a Rocket, Grand River, Pappardelle Di Funghi with chicken, and Warm Chicken Salad; include seat numbers and sharing plates.' },
  { id: 'mock-four', label: 'Split one dessert and two drinks from a four-person cheque, process one cash payment and explain the correct change language.' },
]

export const realServiceSteps: Competency[] = [
  { id: 'real-1', label: '1. Greeting and introduction' },
  { id: 'real-2', label: '2. Drinks and water order' },
  { id: 'real-3', label: '3. Food order with modifiers/allergies confirmed', critical: true },
  { id: 'real-4', label: '4. Side plates or sharing plates delivered' },
  { id: 'real-5', label: '5. Starters served correctly' },
  { id: 'real-6', label: '6. Starter check-back within 90 seconds / two bites' },
  { id: 'real-7', label: '7. Starters cleared and table reset' },
  { id: 'real-8', label: '8. Mains served to correct seats' },
  { id: 'real-9', label: '9. Main-course verbal check-back' },
  { id: 'real-10', label: '10. Visual check-back and beverage refill offered' },
  { id: 'real-11', label: '11. Mains cleared after everyone is finished' },
  { id: 'real-12', label: '12. Dessert, tea or coffee offered' },
  { id: 'real-13', label: '13. Dessert / coffee follow-up completed' },
  { id: 'real-14', label: '14. Bill reviewed and presented accurately', critical: true },
  { id: 'real-15', label: '15. Payment handled correctly under supervision', critical: true },
  { id: 'real-16', label: '16. Guest thanked and given a warm goodbye' },
]
