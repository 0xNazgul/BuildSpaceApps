use anchor_lang::prelude::*;

declare_id!("7EH1hfht9LY56wA4Yab8EqPLnrSaqqaN8szTs8wFCeJW");

#[program]
pub mod myepicproject {
    use super::*;
    pub fn start_stuff_off(ctx: Context<StartStuffOff>) -> ProgramResult {
        // Get a reference to the account.
        let base_account = &mut ctx.accounts.base_account;
        // Initialize total_gifs.
        base_account.total_gifs = 0;
        Ok(())
    }

    // The function now accepts a gif_link param from the user. We also reference the user from the Context
    pub fn add_gif(ctx: Context<AddGif>, gif_link: String) -> ProgramResult {
        // Get a reference to the account and increment total_gifs.
        let base_account = &mut ctx.accounts.base_account;
        let user = &mut ctx.accounts.user;

        // Build the struct.
        let gif = ItemStruct {
            gif_link: gif_link.to_string(),
            user_address: *user.to_account_info().key,
            votes: 0,
        };

        base_account.gif_list.push(gif);
        base_account.total_gifs += 1;
        Ok(())
    }

    pub fn up_vote(ctx: Context<UpdateGif>, index: u64) -> ProgramResult {
      let base_account = &mut ctx.accounts.base_account;

      let i = index as usize;
      if i < base_account.gif_list.len() {
          let mut item = &mut base_account.gif_list[i];
          item.votes += 1;
      }

      Ok(())
    }

	pub fn down_vote(ctx: Context<UpdateGif>, index: u64) -> ProgramResult {
        let base_account = &mut ctx.accounts.base_account;

        let i = index as usize;
        if i < base_account.gif_list.len() {
            let mut item = &mut base_account.gif_list[i];
            item.votes -= 1;
        }

        Ok(())
    }

}

#[error]
pub enum Err {
    #[msg("No item with that url found")]
    NoItemFound,
}

// Attach certain variables to the StartStuffOff context.
#[derive(Accounts)]
pub struct StartStuffOff<'info> {
    #[account(init, payer = user, space = 10000)]
    pub base_account: Account<'info, BaseAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program <'info, System>,
}

// Specify what data you want in the AddGif Context.
#[derive(Accounts)]
pub struct AddGif<'info> {
    #[account(mut)]
    pub base_account: Account<'info, BaseAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
}

// UpvoteGif
#[derive(Accounts)]
pub struct UpdateGif<'info> {
    #[account(mut)]
    pub base_account: Account<'info, BaseAccount>,
}

// Create a custom struct for us to work with.
#[derive(Debug, Clone, AnchorSerialize, AnchorDeserialize)]
pub struct ItemStruct {
    pub gif_link: String,
    pub user_address: Pubkey,
    pub votes: i64,
}

// Tell Solana what we want to store on this account.
#[account]
pub struct BaseAccount {
    pub total_gifs: u64,
	// Attach a Vector of type ItemStruct to the account.
    pub gif_list: Vec<ItemStruct>,
}